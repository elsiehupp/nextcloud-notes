// import ResourceEditWatcher from '@joplin/lib/services/ResourceEditWatcher/index';
// import CommandService from '@joplin/lib/services/CommandService';
import { /*defaultState,*/ State } from './reducer';
// import shim from '@joplin/lib/shim';
// import AlarmService from '@joplin/lib/services/AlarmService';
// import AlarmServiceDriverNode from '@joplin/lib/services/AlarmServiceDriverNode';

// import BaseApplication from '@joplin/lib/BaseApplication';
// import stateToWhenClauseContext from './services/commands/stateToWhenClauseContext';
// import ResourceService from '@joplin/lib/services/ResourceService';

// import Tag from '@joplin/lib/models/Tag';

/*
const commands = [
	require('./gui/MainScreen/commands/editAlarm'),
	require('./gui/MainScreen/commands/exportPdf'),
	require('./gui/MainScreen/commands/hideModalMessage'),
	require('./gui/MainScreen/commands/moveToFolder'),
	require('./gui/MainScreen/commands/newFolder'),
	require('./gui/MainScreen/commands/newNote'),
	require('./gui/MainScreen/commands/newSubFolder'),
	require('./gui/MainScreen/commands/newTodo'),
	require('./gui/MainScreen/commands/openFolder'),
	require('./gui/MainScreen/commands/openNote'),
	require('./gui/MainScreen/commands/openTag'),
	require('./gui/MainScreen/commands/print'),
	require('./gui/MainScreen/commands/renameFolder'),
	require('./gui/MainScreen/commands/renameTag'),
	require('./gui/MainScreen/commands/search'),
	require('./gui/MainScreen/commands/selectTemplate'),
	require('./gui/MainScreen/commands/setTags'),
	require('./gui/MainScreen/commands/showModalMessage'),
	require('./gui/MainScreen/commands/showNoteContentProperties'),
	require('./gui/MainScreen/commands/showNoteProperties'),
	require('./gui/MainScreen/commands/showShareNoteDialog'),
	require('./gui/MainScreen/commands/showSpellCheckerMenu'),
	require('./gui/MainScreen/commands/toggleEditors'),
	require('./gui/MainScreen/commands/toggleLayoutMoveMode'),
	require('./gui/MainScreen/commands/toggleNoteList'),
	require('./gui/MainScreen/commands/toggleSideBar'),
	require('./gui/MainScreen/commands/toggleVisiblePanes'),
	require('./gui/NoteEditor/commands/focusElementNoteBody'),
	require('./gui/NoteEditor/commands/focusElementNoteTitle'),
	require('./gui/NoteEditor/commands/showLocalSearch'),
	require('./gui/NoteEditor/commands/showRevisions'),
	require('./gui/NoteList/commands/focusElementNoteList'),
	require('./gui/NoteListControls/commands/focusSearch'),
	require('./gui/Sidebar/commands/focusElementSideBar'),
];
*/

/*
// Commands that are not tied to any particular component.
// The runtime for these commands can be loaded when the app starts.
const globalCommands = [
	require('./commands/copyDevCommand'),
	require('./commands/exportFolders'),
	require('./commands/exportNotes'),
	require('./commands/focusElement'),
	require('./commands/openProfileDirectory'),
	require('./commands/startExternalEditing'),
	require('./commands/stopExternalEditing'),
	require('./commands/toggleExternalEditing'),
	require('./commands/replaceMisspelling'),
	require('@joplin/lib/commands/historyBackward'),
	require('@joplin/lib/commands/historyForward'),
	require('@joplin/lib/commands/synchronize'),
];
*/

// import editorCommandDeclarations from './gui/NoteEditor/commands/editorCommandDeclarations';

interface AppStateRoute {
	type: string;
	routeName: string;
	props: any;
}

export interface AppState extends State {
	route: AppStateRoute;
	navHistory: any[];
	noteVisiblePanes: string[];
	windowContentSize: any;
	watchedNoteFiles: string[];
	lastEditorScrollPercents: any;
	devToolsVisible: boolean;
	visibleDialogs: any; // empty object if no dialog is visible. Otherwise contains the list of visible dialogs.
	focusedField: string;
	layoutMoveMode: boolean;
	startupPluginsLoaded: boolean;

	// Extra reducer keys go here
	watchedResources: any;
}

/*
const appDefaultState: AppState = {
	...defaultState,
	route: {
		type: 'NAV_GO',
		routeName: 'Main',
		props: {},
	},
	navHistory: [],
	noteVisiblePanes: ['editor', 'viewer'],
	watchedNoteFiles: [],
	lastEditorScrollPercents: {},
	devToolsVisible: false,
	visibleDialogs: {}, // empty object if no dialog is visible. Otherwise contains the list of visible dialogs.
	focusedField: null,
	layoutMoveMode: false,
};
*/

/*
class Application extends BaseApplication {


	setupContextMenu() {
		const MenuItem = bridge().MenuItem;

		// The context menu must be setup in renderer process because that's where
		// the spell checker service lives.
		require('electron-context-menu')({
			shouldShowMenu: (_event: any, params: any) => {
				// params.inputFieldType === 'none' when right-clicking the text editor. This is a bit of a hack to detect it because in this
				// case we don't want to use the built-in context menu but a custom one.
				return params.isEditable && params.inputFieldType !== 'none';
			},

			menu: (actions: any, props: any) => {
				const spellCheckerMenuItems = SpellCheckerService.instance().contextMenuItems(props.misspelledWord, props.dictionarySuggestions).map((item: any) => new MenuItem(item));

				const output = [
					actions.cut(),
					actions.copy(),
					actions.paste(),
					...spellCheckerMenuItems,
				];

				return output;
			},
		});
	}


	constructor() {
		super();

		// AlarmService.setDriver(new AlarmServiceDriverNode({ appName: packageInfo.build.appId }));
		// AlarmService.setLogger(reg.logger());

		for (const command of commands) {
			CommandService.instance().registerDeclaration(command.declaration);
		}

		for (const command of globalCommands) {
			CommandService.instance().registerDeclaration(command.declaration);
			CommandService.instance().registerRuntime(command.declaration.name, command.runtime());
		}

		for (const declaration of editorCommandDeclarations) {
			CommandService.instance().registerDeclaration(declaration);
		}

		shim.setTimeout(() => {
			void AlarmService.garbageCollect();
		}, 1000 * 60 * 60);

		ResourceService.runInBackground();

		// ExternalEditWatcher.instance().setLogger(reg.logger());
		// ExternalEditWatcher.instance().initialize(bridge, this.store().dispatch);

		ResourceEditWatcher.instance().initialize(reg.logger(), (action: any) => { this.store().dispatch(action); });

		RevisionService.instance().runInBackground();

		this.setupContextMenu();

		return null;
	}

}
*/
