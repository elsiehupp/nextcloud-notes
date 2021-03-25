// import ResourceEditWatcher from '@joplin/lib/services/ResourceEditWatcher/index';
// import { _ } from '@joplin/lib/locale';

import Resource from './Resource';
import htmlUtils from './htmlUtils';
const clipboard = navigator.clipboard;
const { toSystemSlashes } = require('@joplin/lib/path-utils');

export enum ContextMenuItemType {
	None = '',
	Image = 'image',
	Resource = 'resource',
	Text = 'text',
	Link = 'link',
}

export interface ContextMenuOptions {
	itemType: ContextMenuItemType;
	resourceId: string;
	linkToCopy: string;
	textToCopy: string;
	htmlToCopy: string;
	insertContent: Function;
	isReadOnly?: boolean;
}

interface ContextMenuItem {
	label: string;
	onAction: Function;
	isActive: Function;
}

interface ContextMenuItems {
	[key: string]: ContextMenuItem;
}

/*
async function resourceInfo(options: ContextMenuOptions): Promise<any> {
	const resource = options.resourceId ? await Resource.load(options.resourceId) : null;
	const resourcePath = resource ? Resource.fullPath(resource) : '';
	return { resource, resourcePath };
}
*/



function handleCopyToClipboard(options: ContextMenuOptions) {
	if (options.textToCopy) {
		clipboard.writeText(options.textToCopy);
	} else if (options.htmlToCopy) {
		// In that case we need to set both HTML and Text context, otherwise it
		// won't be possible to paste the text in, for example, a text editor.
		// https://github.com/laurent22/joplin/issues/4441
		// clipboard.write({
		// 	text: htmlUtils.stripHtml(options.htmlToCopy),
		// 	html: options.htmlToCopy,
		// });
	}
}


export function menuItems(): ContextMenuItems {
	return {
		open: {
			label: ('Open...'),
			onAction: async (options: ContextMenuOptions) => {
				try {
					// await ResourceEditWatcher.instance().openAndWatch(options.resourceId);
				} catch (error) {
					console.error(error);
				}
			},
			isActive: (itemType: ContextMenuItemType) => itemType === ContextMenuItemType.Image || itemType === ContextMenuItemType.Resource,
		},
		/*
		saveAs: {
			label: ('Save as...'),
			onAction: async (options: ContextMenuOptions) => {
				const { resourcePath, resource } = await resourceInfo(options);
				const filePath = bridge().showSaveDialog({
					defaultPath: resource.filename ? resource.filename : resource.title,
				});
				if (!filePath) return;
				await fs.copy(resourcePath, filePath);
			},
			isActive: (itemType: ContextMenuItemType) => itemType === ContextMenuItemType.Image || itemType === ContextMenuItemType.Resource,
		},
		*/
		/*
		revealInFolder: {
			label: ('Reveal file in folder'),
			onAction: async (options: ContextMenuOptions) => {
				const { resourcePath } = await resourceInfo(options);
				bridge().showItemInFolder(resourcePath);
			},
			isActive: (itemType: ContextMenuItemType) => itemType === ContextMenuItemType.Image || itemType === ContextMenuItemType.Resource,
		},
		*/
		/*
		copyPathToClipboard: {
			label: ('Copy path to clipboard'),
			onAction: async (options: ContextMenuOptions) => {
				const { resourcePath } = await resourceInfo(options);
				clipboard.writeText(toSystemSlashes(resourcePath));
			},
			isActive: (itemType: ContextMenuItemType) => itemType === ContextMenuItemType.Image || itemType === ContextMenuItemType.Resource,
		},
		*/
		/*
		cut: {
			label: ('Cut'),
			onAction: async (options: ContextMenuOptions) => {
				handleCopyToClipboard(options);
				options.insertContent('');
			},
			isActive: (_itemType: ContextMenuItemType, options: ContextMenuOptions) => !options.isReadOnly && (!!options.textToCopy || !!options.htmlToCopy),
		},
		*/
		/*
		copy: {
			label: ('Copy'),
			onAction: async (options: ContextMenuOptions) => {
				handleCopyToClipboard(options);
			},
			isActive: (_itemType: ContextMenuItemType, options: ContextMenuOptions) => !!options.textToCopy || !!options.htmlToCopy,
		},
		*/
		/*
		paste: {
			label: ('Paste'),
			onAction: async (options: ContextMenuOptions) => {
				const content = clipboard.readHTML() ? clipboard.readHTML() : clipboard.readText();
				options.insertContent(content);
			},
			isActive: (_itemType: ContextMenuItemType, options: ContextMenuOptions) => !options.isReadOnly && (!!clipboard.readText() || !!clipboard.readHTML()),
		},
		*/
		/*
		copyLinkUrl: {
			label: ('Copy Link Address'),
			onAction: async (options: ContextMenuOptions) => {
				clipboard.writeText(options.linkToCopy !== null ? options.linkToCopy : options.textToCopy);
			},
			isActive: (itemType: ContextMenuItemType, options: ContextMenuOptions) => itemType === ContextMenuItemType.Link || !!options.linkToCopy,
		},
		*/
	};
}

export default async function contextMenu(options: ContextMenuOptions) {
	// const menu = new Menu();

	const items = menuItems();

	if (!('readyOnly' in options)) options.isReadOnly = true;

	for (const itemKey in items) {
		const item = items[itemKey];

		if (!item.isActive(options.itemType, options)) continue;

		// menu.append(new MenuItem({
		// 	label: item.label,
		// 	click: () => {
		// 		item.onAction(options);
		// 	},
		// }));
	}

	// return menu;
}
