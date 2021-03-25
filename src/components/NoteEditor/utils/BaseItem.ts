import { ModelType } from './BaseModel';
import { NoteEntity } from './types';
// import Setting from './Setting';
import BaseModel from './BaseModel';
import time from './time';
import markdownUtils from './markdownUtils';
// import { _ } from '../locale';

// import Database from '../database';
// import ItemChange from './ItemChange';
// const JoplinError = require('../JoplinError.js');
// const { sprintf } = require('sprintf-js');
// const moment = require('moment');

export default class BaseItem extends BaseModel {

	public static revisionService_: any = null;

	public static syncItemDefinitions_: any[] = [
		{ type: BaseModel.TYPE_NOTE, className: 'Note' },
		{ type: BaseModel.TYPE_FOLDER, className: 'Folder' },
		{ type: BaseModel.TYPE_RESOURCE, className: 'Resource' },
		{ type: BaseModel.TYPE_TAG, className: 'Tag' },
		{ type: BaseModel.TYPE_NOTE_TAG, className: 'NoteTag' },
		{ type: BaseModel.TYPE_MASTER_KEY, className: 'MasterKey' },
		{ type: BaseModel.TYPE_REVISION, className: 'Revision' },
	];

	public static SYNC_ITEM_LOCATION_LOCAL = 1;
	public static SYNC_ITEM_LOCATION_REMOTE = 2;


	static useUuid() {
		return true;
	}

	static loadClass(className: string, classRef: any) {
		for (let i = 0; i < BaseItem.syncItemDefinitions_.length; i++) {
			if (BaseItem.syncItemDefinitions_[i].className == className) {
				BaseItem.syncItemDefinitions_[i].classRef = classRef;
				return;
			}
		}

		throw new Error(`Invalid class name: ${className}`);
	}

	// Need to dynamically load the classes like this to avoid circular dependencies
	static getClass(name: string) {
		for (let i = 0; i < BaseItem.syncItemDefinitions_.length; i++) {
			if (BaseItem.syncItemDefinitions_[i].className == name) {
				const classRef = BaseItem.syncItemDefinitions_[i].classRef;
				if (!classRef) throw new Error(`Class has not been loaded: ${name}`);
				return BaseItem.syncItemDefinitions_[i].classRef;
			}
		}

		throw new Error(`Invalid class name: ${name}`);
	}

	static getClassByItemType(itemType: ModelType) {
		for (let i = 0; i < BaseItem.syncItemDefinitions_.length; i++) {
			if (BaseItem.syncItemDefinitions_[i].type == itemType) {
				return BaseItem.syncItemDefinitions_[i].classRef;
			}
		}

		throw new Error(`Invalid item type: ${itemType}`);
	}

	public static systemPath(itemOrId: any, extension: string = null) {
		if (extension === null) extension = 'md';

		if (typeof itemOrId === 'string') return `${itemOrId}.${extension}`;
		else return `${itemOrId.id}.${extension}`;
	}

	static isSystemPath(path: string) {
		// 1b175bb38bba47baac22b0b47f778113.md
		if (!path || !path.length) return false;
		let p: any = path.split('/');
		p = p[p.length - 1];
		p = p.split('.');
		if (p.length != 2) return false;
		return p[0].length == 32 && p[1] == 'md';
	}

	static itemClass(item: any): any {
		if (!item) throw new Error('Item cannot be null');

		if (typeof item === 'object') {
			if (!('type_' in item)) throw new Error('Item does not have a type_ property');
			return this.itemClass(item.type_);
		} else {
			for (let i = 0; i < BaseItem.syncItemDefinitions_.length; i++) {
				const d = BaseItem.syncItemDefinitions_[i];
				if (Number(item) == d.type) return this.getClass(d.className);
			}
			throw new Error(`Unknown type: ${item}`);
		}
	}

	static serialize_format(propName: string, propValue: any) {
		if (['created_time', 'updated_time', 'sync_time', 'user_updated_time', 'user_created_time'].indexOf(propName) >= 0) {
			if (!propValue) return '';
			// propValue = `${moment.unix(propValue / 1000).utc().format('YYYY-MM-DDTHH:mm:ss.SSS')}Z`;
		} else if (['title_diff', 'body_diff'].indexOf(propName) >= 0) {
			if (!propValue) return '';
			propValue = JSON.stringify(propValue);
		} else if (propValue === null || propValue === undefined) {
			propValue = '';
		} else {
			propValue = `${propValue}`;
		}

		if (propName === 'body') return propValue;

		return propValue
			.replace(/\\n/g, '\\\\n')
			.replace(/\\r/g, '\\\\r')
			.replace(/\n/g, '\\n')
			.replace(/\r/g, '\\r');
	}

	static unserialize_format(type: ModelType, propName: string, propValue: any) {
		if (propName[propName.length - 1] == '_') return propValue; // Private property

		const ItemClass = this.itemClass(type);

		if (['title_diff', 'body_diff'].indexOf(propName) >= 0) {
			if (!propValue) return '';
			propValue = JSON.parse(propValue);
		} else if (['longitude', 'latitude', 'altitude'].indexOf(propName) >= 0) {
			const places = (propName === 'altitude') ? 4 : 8;
			propValue = Number(propValue).toFixed(places);
		} else {
			if (['created_time', 'updated_time', 'user_created_time', 'user_updated_time'].indexOf(propName) >= 0) {
				// propValue = (!propValue) ? '0' : moment(propValue, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('x');
			}
			// propValue = Database.formatValue(ItemClass.fieldType(propName), propValue);
		}

		if (propName === 'body') return propValue;

		return typeof propValue === 'string' ? propValue
			.replace(/\\n/g, '\n')
			.replace(/\\r/g, '\r')
			.replace(/\\\n/g, '\\n')
			.replace(/\\\r/g, '\\r')
			: propValue;
	}

	static async serialize(item: any, shownKeys: any[] = null) {
		if (shownKeys === null) {
			shownKeys = this.itemClass(item).fieldNames();
			shownKeys.push('type_');
		}

		item = this.filter(item);

		const output: any = {};

		if ('title' in item && shownKeys.indexOf('title') >= 0) {
			output.title = item.title;
		}

		if ('body' in item && shownKeys.indexOf('body') >= 0) {
			output.body = item.body;
		}

		output.props = [];

		for (let i = 0; i < shownKeys.length; i++) {
			let key = shownKeys[i];
			if (key == 'title' || key == 'body') continue;

			let value = null;
			if (typeof key === 'function') {
				const r = await key();
				key = r.key;
				value = r.value;
			} else {
				value = this.serialize_format(key, item[key]);
			}

			output.props.push(`${key}: ${value}`);
		}

		const temp = [];

		if (typeof output.title === 'string') temp.push(output.title);
		if (output.body) temp.push(output.body);
		if (output.props.length) temp.push(output.props.join('\n'));

		return temp.join('\n\n');
	}


	/*
	static revisionService() {
		if (!this.revisionService_) throw new Error('BaseItem.revisionService_ is not set!!');
		return this.revisionService_;
	}
	*/


	static async serializeForSync(item: any) {
		const ItemClass = this.itemClass(item);
		const shownKeys = ItemClass.fieldNames();
		shownKeys.push('type_');

		const serialized = await ItemClass.serialize(item, shownKeys);

		// List of keys that won't be encrypted - mostly foreign keys required to link items
		// with each others and timestamp required for synchronisation.
		const keepKeys = ['id', 'note_id', 'tag_id', 'parent_id', 'updated_time', 'type_'];
		const reducedItem: any = {};

		return ItemClass.serialize(reducedItem);
	}

	static async unserialize(content: string) {
		const lines = content.split('\n');
		let output: any = {};
		let state = 'readingProps';
		const body: string[] = [];

		for (let i = lines.length - 1; i >= 0; i--) {
			let line = lines[i];

			if (state == 'readingProps') {
				line = line.trim();

				if (line == '') {
					state = 'readingBody';
					continue;
				}

				const p = line.indexOf(':');
				if (p < 0) throw new Error(`Invalid property format: ${line}: ${content}`);
				const key = line.substr(0, p).trim();
				const value = line.substr(p + 1).trim();
				output[key] = value;
			} else if (state == 'readingBody') {
				body.splice(0, 0, line);
			}
		}

		if (!output.type_) throw new Error(`Missing required property: type_: ${content}`);
		output.type_ = Number(output.type_);

		if (body.length) {
			const title = body.splice(0, 2);
			output.title = title[0];
		}

		if (output.type_ === BaseModel.TYPE_NOTE) output.body = body.join('\n');

		const ItemClass = this.itemClass(output.type_);
		output = ItemClass.removeUnknownFields(output);

		for (const n in output) {
			if (!output.hasOwnProperty(n)) continue;
			output[n] = await this.unserialize_format(output.type_, n, output[n]);
		}

		return output;
	}


	static syncItemClassNames() {
		return BaseItem.syncItemDefinitions_.map((def: any) => {
			return def.className;
		});
	}


	static syncItemTypes() {
		return BaseItem.syncItemDefinitions_.map((def: any) => {
			return def.type;
		});
	}

	static modelTypeToClassName(type: number) {
		for (let i = 0; i < BaseItem.syncItemDefinitions_.length; i++) {
			if (BaseItem.syncItemDefinitions_[i].type == type) return BaseItem.syncItemDefinitions_[i].className;
		}
		throw new Error(`Invalid type: ${type}`);
	}

	static displayTitle(item: any) {
		if (!item) return '';
		if (item.encryption_applied) return `🔑 ${('Encrypted')}`;
		return item.title ? item.title : ('Untitled');
	}

	static markdownTag(itemOrId: any) {
		const item = typeof itemOrId === 'object' ? itemOrId : {
			id: itemOrId,
			title: '',
		};

		const output = [];
		output.push('[');
		output.push(markdownUtils.escapeTitleText(item.title));
		output.push(']');
		output.push(`(:/${item.id})`);
		return output.join('');
	}

	static isMarkdownTag(md: any) {
		if (!md) return false;
		return !!md.match(/^\[.*?\]\(:\/[0-9a-zA-Z]{32}\)$/);
	}

}
