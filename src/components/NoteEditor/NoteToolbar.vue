<template>
	<div className="editor-toolbar">
		<div>
			{leftItemComps}
		</div>
		<div>
			{centerItemComps}
		</div>
		<div>
			{rightItemComps}
		</div>
	</div>
</template>

<script>



const leftItemComps = [];
const centerItemComps = [];
const rightItemComps = [];




import CommandService from '@joplin/lib/services/CommandService';
import ToolbarBase from '../ToolbarBase';
import { utils as pluginUtils } from '@joplin/lib/services/plugins/reducer';
import ToolbarButtonUtils, { ToolbarButtonInfo } from '@joplin/lib/services/commands/ToolbarButtonUtils';

function NoteToolbar(noteToolbarProps) {
	return <ToolbarBase /*style={styles.root}*/ items={props.toolbarButtonInfos} />;
}

const toolbarButtonUtils = new ToolbarButtonUtils(CommandService.instance());

const mapStateToProps = (state) => {
	const whenClauseContext = stateToWhenClauseContext(state);

	return {
		toolbarButtonInfos: toolbarButtonUtils.commandsToToolbarButtons([
			'showSpellCheckerMenu',
			'editAlarm',
			'toggleVisiblePanes',
			'showNoteProperties',
		].concat(pluginUtils.commandNamesFromViews(state.pluginService.plugins, 'noteToolbar')), whenClauseContext),
	};
};

class ToolbarBaseComponent {

	render() {
		/*
		const theme = themeStyle(this.props.themeId);

		const style: any = Object.assign({
			display: 'flex',
			flexDirection: 'row',
			boxSizing: 'border-box',
			backgroundColor: theme.backgroundColor3,
			padding: theme.toolbarPadding,
			paddingRight: theme.mainPadding,
		}, this.props.style);

		const groupStyle: any = {
			display: 'flex',
			flexDirection: 'row',
			boxSizing: 'border-box',
		};
		*/
		if (this.props.items) {
			for (let i = 0; i < this.props.items.length; i++) {
				const o = this.props.items[i];
				let key = o.iconName ? o.iconName : '';
				key += o.title ? o.title : '';
				key += o.name ? o.name : '';
				const itemType = !('type' in o) ? 'button' : o.type;

				if (!key) key = `${o.type}_${i}`;

				const props = Object.assign(
					{
						key: key,
						themeId: this.props.themeId,
					},
					o
				);

				if (o.name === 'toggleEditors') {
					rightItemComps.push(<ToggleEditorsButton
						key={o.name}
						value={Value.Markdown}
						themeId={this.props.themeId}
						toolbarButtonInfo={o}
					/>);
				} else if (itemType === 'button') {
					const target = ['historyForward', 'historyBackward', 'toggleExternalEditing'].includes(o.name) ? leftItemComps : centerItemComps;
					target.push(<ToolbarButton {...props} />);
				} else if (itemType === 'separator') {
					centerItemComps.push(<ToolbarSpace {...props} />);
				}
			}
		}

		return;
	}
}

/*
interface Props {
	themeId: number;
	style: any;
	items: any[];
}
*/



const mapStateToProps = (state) => {
	return { themeId: state.settings.theme };
};

export default connect(mapStateToProps)(ToolbarBaseComponent);

</script>