// import AsyncActionQueue from '@joplin/lib/AsyncActionQueue';
// import UndoRedoService from '@joplin/lib/services/UndoRedoService';
import uuid from './uuid';
// import Setting from '@joplin/lib/models/Setting';
import shim from './shim';
// import NoteBodyViewer from '../NoteBodyViewer/NoteBodyViewer';
// import checkPermissions from '../../utils/checkPermissions';

import BaseItem from './BaseItem';
import Resource from './Resource';
// import Folder from '@joplin/lib/models/Folder';
const Clipboard = require('@react-native-community/clipboard').default;
// const md5 = require('md5');
// const { BackButtonService } = require('../../services/back-button.js');
// import NavService from '@joplin/lib/services/NavService';
import BaseModel from './BaseModel';
// const mimeUtils = require('@joplin/lib/mime-utils.js').mime;
// const { ScreenHeader } = require('../screen-header.js');
const NoteTagsDialog = require('../NoteTagsDialog');
import time from './time';
// import ResourceFetcher from '@joplin/lib/services/ResourceFetcher';
// const { dialogs } = require('../../utils/dialogs.js');
// import SelectDateTimeDialog from '../SelectDateTimeDialog';
// const urlUtils = require('@joplin/lib/urlUtils');

const emptyArray: any[] = [];

const React = require('react');

const rootStyles_ = {};


class NoteScreenComponent extends React.Component {

	/*
	constructor() {
		super();
		this.state = {
			note: Note.new(),
			mode: 'view',
			folder: null,
			lastSavedNote: null,
			isLoading: true,
			titleTextInputHeight: 20,
			alarmDialogShown: false,
			heightBumpView: 0,
			noteTagDialogShown: false,
			fromShare: false,
			showCamera: false,
			noteResources: {},

			undoRedoButtonState: {
				canUndo: false,
				canRedo: false,
			},
		};

		this.noteTagDialog_closeRequested = () => {
			this.setState({ noteTagDialogShown: false });
		};


		this.refreshResource = async (resource: any, noteBody: string = null) => {
			if (noteBody === null && this.state.note && this.state.note.body) noteBody = this.state.note.body;
			if (noteBody === null) return;

			const resourceIds = await Note.linkedResourceIds(noteBody);
			if (resourceIds.indexOf(resource.id) >= 0) {
				shared.clearResourceCache();
				const attachedResources = await shared.attachedResources(noteBody);
				this.setState({ noteResources: attachedResources });
			}
		};

		this.takePhoto_onPress = this.takePhoto_onPress.bind(this);
		this.cameraView_onPhoto = this.cameraView_onPhoto.bind(this);
		this.cameraView_onCancel = this.cameraView_onCancel.bind(this);
		this.properties_onPress = this.properties_onPress.bind(this);
		this.showOnMap_onPress = this.showOnMap_onPress.bind(this);
		this.onMarkForDownload = this.onMarkForDownload.bind(this);
		this.sideMenuOptions = this.sideMenuOptions.bind(this);
		this.folderPickerOptions_valueChanged = this.folderPickerOptions_valueChanged.bind(this);
		this.saveNoteButton_press = this.saveNoteButton_press.bind(this);
		this.onAlarmDialogAccept = this.onAlarmDialogAccept.bind(this);
		this.onAlarmDialogReject = this.onAlarmDialogReject.bind(this);
		this.todoCheckbox_change = this.todoCheckbox_change.bind(this);
		this.titleTextInput_contentSizeChange = this.titleTextInput_contentSizeChange.bind(this);
		this.title_changeText = this.title_changeText.bind(this);
		this.undoRedoService_stackChange = this.undoRedoService_stackChange.bind(this);
		this.screenHeader_undoButtonPress = this.screenHeader_undoButtonPress.bind(this);
		this.screenHeader_redoButtonPress = this.screenHeader_redoButtonPress.bind(this);
		this.body_selectionChange = this.body_selectionChange.bind(this);
		this.onBodyViewerLoadEnd = this.onBodyViewerLoadEnd.bind(this);
		this.onBodyViewerCheckboxChange = this.onBodyViewerCheckboxChange.bind(this);

	}
	*/

	/*
	undoRedoService_stackChange() {
		this.setState({ undoRedoButtonState: {
			canUndo: this.undoRedoService_.canUndo,
			canRedo: this.undoRedoService_.canRedo,
		} });
	}
	*/

	/*
	async requestGeoLocationPermissions() {
		if (!Setting.value('trackLocation')) return;

		const response = await checkPermissions(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			message: _('In order to associate a geo-location with the note, the app needs your permission to access your location.\n\nYou may turn off this option at any time in the Configuration screen.'),
			title: _('Permission needed'),
		});

		// If the user simply pressed "Deny", we don't automatically switch it off because they might accept
		// once we show the rationale again on second try. If they press "Never again" however we switch it off.
		// https://github.com/zoontek/react-native-permissions/issues/385#issuecomment-563132396
		if (response === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
			reg.logger().info('Geo-location tracking has been automatically disabled');
			Setting.setValue('trackLocation', false);
		}
	}
	*/

	/*
	body_changeText(text: string) {
		if (!this.undoRedoService_.canUndo) {
			this.undoRedoService_.push(this.undoState());
		} else {
			this.undoRedoService_.schedulePush(this.undoState());
		}
		shared.noteComponent_change(this, 'body', text);
		this.scheduleSave();
	}

	body_selectionChange(event: any) {
		this.selection = event.nativeEvent.selection;
	}
	*/

	/*
	async pickDocument() {
		try {
			const result = await DocumentPicker.pick();
			return result;
		} catch (error) {
			if (DocumentPicker.isCancel(error)) {
				console.info('pickDocument: user has cancelled');
				return null;
			} else {
				throw error;
			}
		}
	}
	*/

	/*
	async imageDimensions(uri: string) {
		return new Promise((resolve, reject) => {
			Image.getSize(
				uri,
				(width: number, height: number) => {
					resolve({ width: width, height: height });
				},
				(error: any) => {
					reject(error);
				}
			);
		});
	}
	*/

	/*
	showImagePicker(options: any) {
		return new Promise((resolve) => {
			ImagePicker.launchImageLibrary(options, (response: any) => {
				resolve(response);
			});
		});
	}
	*/

	/*
	async resizeImage(localFilePath: string, targetPath: string, mimeType: string) {
		const maxSize = Resource.IMAGE_MAX_DIMENSION;

		const dimensions: any = await this.imageDimensions(localFilePath);

		reg.logger().info('Original dimensions ', dimensions);

		let mustResize = dimensions.width > maxSize || dimensions.height > maxSize;

		if (mustResize) {
			const buttonId = await dialogs.pop(this, _('You are about to attach a large image (%dx%d pixels). Would you like to resize it down to %d pixels before attaching it?', dimensions.width, dimensions.height, maxSize), [
				{ text: _('Yes'), id: 'yes' },
				{ text: _('No'), id: 'no' },
				{ text: _('Cancel'), id: 'cancel' },
			]);

			if (buttonId === 'cancel') return false;

			mustResize = buttonId === 'yes';
		}

		if (mustResize) {
			dimensions.width = maxSize;
			dimensions.height = maxSize;

			reg.logger().info('New dimensions ', dimensions);

			const format = mimeType == 'image/png' ? 'PNG' : 'JPEG';
			reg.logger().info(`Resizing image ${localFilePath}`);
			const resizedImage = await ImageResizer.createResizedImage(localFilePath, dimensions.width, dimensions.height, format, 85); // , 0, targetPath);

			const resizedImagePath = resizedImage.uri;
			reg.logger().info('Resized image ', resizedImagePath);
			reg.logger().info(`Moving ${resizedImagePath} => ${targetPath}`);

			await RNFS.copyFile(resizedImagePath, targetPath);

			try {
				await RNFS.unlink(resizedImagePath);
			} catch (error) {
				reg.logger().warn('Error when unlinking cached file: ', error);
			}
		} else {
			await RNFS.copyFile(localFilePath, targetPath);
		}

		return true;
	}
	*/

	/*
	async attachFile(pickerResponse: any, fileType: string) {
		if (!pickerResponse) {
			// User has cancelled
			return;
		}

		if (pickerResponse.error) {
			reg.logger().warn('Got error from picker', pickerResponse.error);
			return;
		}

		if (pickerResponse.didCancel) {
			reg.logger().info('User cancelled picker');
			return;
		}

		const localFilePath = Platform.select({
			android: pickerResponse.uri,
			ios: decodeURI(pickerResponse.uri),
		});

		let mimeType = pickerResponse.type;

		if (!mimeType) {
			const ext = fileExtension(localFilePath);
			mimeType = mimeUtils.fromFileExtension(ext);
		}

		if (!mimeType && fileType === 'image') {
			// Assume JPEG if we couldn't determine the file type. It seems to happen with the image picker
			// when the file path is something like content://media/external/images/media/123456
			// If the image is not a JPEG, something will throw an error below, but there's a good chance
			// it will work.
			reg.logger().info('Missing file type and could not detect it - assuming image/jpg');
			mimeType = 'image/jpg';
		}

		reg.logger().info(`Got file: ${localFilePath}`);
		reg.logger().info(`Got type: ${mimeType}`);

		let resource = Resource.new();
		resource.id = uuid.create();
		resource.mime = mimeType;
		resource.title = pickerResponse.name ? pickerResponse.name : '';
		resource.file_extension = safeFileExtension(fileExtension(pickerResponse.name ? pickerResponse.name : localFilePath));

		if (!resource.mime) resource.mime = 'application/octet-stream';

		const targetPath = Resource.fullPath(resource);

		try {
			if (mimeType == 'image/jpeg' || mimeType == 'image/jpg' || mimeType == 'image/png') {
				const done = await this.resizeImage(localFilePath, targetPath, mimeType);
				if (!done) return;
			} else {
				if (fileType === 'image') {
					dialogs.error(this, _('Unsupported image type: %s', mimeType));
					return;
				} else {
					await shim.fsDriver().copy(localFilePath, targetPath);

					const stat = await shim.fsDriver().stat(targetPath);
					if (stat.size >= 10000000) {
						await shim.fsDriver().remove(targetPath);
						throw new Error('Resources larger than 10 MB are not currently supported as they may crash the mobile applications. The issue is being investigated and will be fixed at a later time.');
					}
				}
			}
		} catch (error) {
			reg.logger().warn('Could not attach file:', error);
			await dialogs.error(this, error.message);
			return;
		}

		const itDoes = await shim.fsDriver().waitTillExists(targetPath);
		if (!itDoes) throw new Error(`Resource file was not created: ${targetPath}`);

		const fileStat = await shim.fsDriver().stat(targetPath);
		resource.size = fileStat.size;

		resource = await Resource.save(resource, { isNew: true });

		const resourceTag = Resource.markdownTag(resource);

		const newNote = Object.assign({}, this.state.note);

		if (this.state.mode == 'edit' && !this.useBetaEditor() && !!this.selection) {
			const prefix = newNote.body.substring(0, this.selection.start);
			const suffix = newNote.body.substring(this.selection.end);
			newNote.body = `${prefix}\n${resourceTag}\n${suffix}`;
		} else {
			newNote.body += `\n${resourceTag}`;
		}

		this.setState({ note: newNote });

		this.refreshResource(resource, newNote.body);

		this.scheduleSave();
	}
	*/

	/*
	async attachPhoto_onPress() {
		const response = await this.showImagePicker({ mediaType: 'photo', noData: true });
		await this.attachFile(response, 'image');
	}
	*/

	/*
	takePhoto_onPress() {
		this.setState({ showCamera: true });
	}
	*/

	/*
	cameraView_onPhoto(data: any) {
		void this.attachFile(
			{
				uri: data.uri,
				didCancel: false,
				error: null,
				type: 'image/jpg',
			},
			'image'
		);

		this.setState({ showCamera: false });
	}
	*/

	/*
	cameraView_onCancel() {
		this.setState({ showCamera: false });
	}
	*/

	/*
	async attachFile_onPress() {
		const response = await this.pickDocument();
		await this.attachFile(response, 'all');
	}
	*/

	/*
	toggleIsTodo_onPress() {
		shared.toggleIsTodo_onPress(this);

		this.scheduleSave();
	}
	*/

	tags_onPress() {
		if (!this.state.note || !this.state.note.id) return;

		this.setState({ noteTagDialogShown: true });
	}

	/*
	async share_onPress() {
		await Share.share({
			message: `${this.state.note.title}\n\n${this.state.note.body}`,
			title: this.state.note.title,
		});
	}
	*/

	properties_onPress() {
		this.props.dispatch({ type: 'SIDE_MENU_OPEN' });
	}

	/*
	setAlarm_onPress() {
		this.setState({ alarmDialogShown: true });
	}
	*/

	/*
	async onAlarmDialogAccept(date: Date) {
		const newNote = Object.assign({}, this.state.note);
		newNote.todo_due = date ? date.getTime() : 0;

		await this.saveOneProperty('todo_due', date ? date.getTime() : 0);

		this.setState({ alarmDialogShown: false });
	}
	*/

	/*
	onAlarmDialogReject() {
		this.setState({ alarmDialogShown: false });
	}
	*/

	/*
	async showOnMap_onPress() {
		if (!this.state.note.id) return;

		const note = await Note.load(this.state.note.id);
		try {
			const url = Note.geolocationUrl(note);
			Linking.openURL(url);
		} catch (error) {
			this.props.dispatch({ type: 'SIDE_MENU_CLOSE' });
			await dialogs.error(this, error.message);
		}
	}
	*/

	/*
	async showSource_onPress() {
		if (!this.state.note.id) return;

		const note = await Note.load(this.state.note.id);
		try {
			Linking.openURL(note.source_url);
		} catch (error) {
			await dialogs.error(this, error.message);
		}
	}
	*/

	/*
	copyMarkdownLink_onPress() {
		const note = this.state.note;
		Clipboard.setString(Note.markdownTag(note));
	}
	*/

	/*
	sideMenuOptions() {
		const note = this.state.note;
		if (!note) return [];

		const output = [];

		const createdDateString = time.formatMsToLocal(note.user_created_time);
		const updatedDateString = time.formatMsToLocal(note.user_updated_time);

		output.push({ title: _('Created: %s', createdDateString) });
		output.push({ title: _('Updated: %s', updatedDateString) });
		output.push({ isDivider: true });

		output.push({
			title: _('View on map'),
			onPress: () => {
				void this.showOnMap_onPress();
			},
		});
		if (note.source_url) {
			output.push({
				title: _('Go to source URL'),
				onPress: () => {
					void this.showSource_onPress();
				},
			});
		}

		return output;
	}
	*/

	/*
	menuOptions() {
		const note = this.state.note;
		const isTodo = note && !!note.is_todo;
		const isSaved = note && note.id;

		const cacheKey = md5([isTodo, isSaved].join('_'));
		if (!this.menuOptionsCache_) this.menuOptionsCache_ = {};

		if (this.menuOptionsCache_[cacheKey]) return this.menuOptionsCache_[cacheKey];

		const output = [];

		// The file attachement modules only work in Android >= 5 (Version 21)
		// https://github.com/react-community/react-native-image-picker/issues/606

		// As of 2020-10-13, support for attaching images from the gallery is removed
		// as the package react-native-image-picker has permission issues. It's still
		// possible to attach files, which has often a similar UI, with thumbnails for
		// images so normally it should be enough.
		let canAttachPicture = true;
		if (Platform.OS === 'android' && Platform.Version < 21) canAttachPicture = false;
		if (canAttachPicture) {
			output.push({
				title: _('Attach...'),
				onPress: async () => {
					const buttons = [];

					// On iOS, it will show "local files", which means certain files saved from the browser
					// and the iCloud files, but it doesn't include photos and images from the CameraRoll
					//
					// On Android, it will depend on the phone, but usually it will allow browing all files and photos.
					buttons.push({ text: _('Attach file'), id: 'attachFile' });

					// Disabled on Android because it doesn't work due to permission issues, but enabled on iOS
					// because that's only way to browse photos from the camera roll.
					if (Platform.OS === 'ios') buttons.push({ text: _('Attach photo'), id: 'attachPhoto' });
					buttons.push({ text: _('Take photo'), id: 'takePhoto' });

					const buttonId = await dialogs.pop(this, _('Choose an option'), buttons);

					if (buttonId === 'takePhoto') this.takePhoto_onPress();
					if (buttonId === 'attachFile') void this.attachFile_onPress();
					if (buttonId === 'attachPhoto') void this.attachPhoto_onPress();
				},
			});
		}

		if (isTodo) {
			output.push({
				title: _('Set alarm'),
				onPress: () => {
					this.setState({ alarmDialogShown: true });
				},
			});
		}

		output.push({
			title: _('Share'),
			onPress: () => {
				void this.share_onPress();
			},
		});
		if (isSaved) {
			output.push({
				title: _('Tags'),
				onPress: () => {
					this.tags_onPress();
				},
			});
		}
		output.push({
			title: isTodo ? _('Convert to note') : _('Convert to todo'),
			onPress: () => {
				this.toggleIsTodo_onPress();
			},
		});
		if (isSaved) {
			output.push({
				title: _('Copy Markdown link'),
				onPress: () => {
					this.copyMarkdownLink_onPress();
				},
			});
		}
		output.push({
			title: _('Properties'),
			onPress: () => {
				this.properties_onPress();
			},
		});
		output.push({
			title: _('Delete'),
			onPress: () => {
				void this.deleteNote_onPress();
			},
		});

		this.menuOptionsCache_ = {};
		this.menuOptionsCache_[cacheKey] = output;

		return output;
	}
	*/

	/*
	async todoCheckbox_change(checked: boolean) {
		await this.saveOneProperty('todo_completed', checked ? time.unixMs() : 0);
	}
	*/

	/*
	titleTextInput_contentSizeChange(event: any) {
		if (!this.enableMultilineTitle_) return;

		const height = event.nativeEvent.contentSize.height;
		this.setState({ titleTextInputHeight: height });
	}
	*/

	/*
	scheduleFocusUpdate() {
		if (this.focusUpdateIID_) shim.clearTimeout(this.focusUpdateIID_);

		this.focusUpdateIID_ = shim.setTimeout(() => {
			this.focusUpdateIID_ = null;
			this.focusUpdate();
		}, 100);
	}
	*/

	/*
	focusUpdate() {
		if (this.focusUpdateIID_) shim.clearTimeout(this.focusUpdateIID_);
		this.focusUpdateIID_ = null;

		if (!this.state.note) return;
		let fieldToFocus = this.state.note.is_todo ? 'title' : 'body';
		if (this.state.mode === 'view') fieldToFocus = '';

		if (fieldToFocus === 'title' && this.refs.titleTextField) {
			this.refs.titleTextField.focus();
		}
		// if (fieldToFocus === 'body' && this.markdownEditorRef.current) {
		// 	if (this.markdownEditorRef.current) {
		// 		this.markdownEditorRef.current.focus();
		// 	}
		// }
	}
	*/

	/*
	async folderPickerOptions_valueChanged(itemValue: any) {
		const note = this.state.note;
		const isProvisionalNote = this.props.provisionalNoteIds.includes(note.id);

		if (isProvisionalNote) {
			await this.saveNoteButton_press(itemValue);
		} else {
			await Note.moveToFolder(note.id, itemValue);
		}

		note.parent_id = itemValue;

		const folder = await Folder.load(note.parent_id);

		this.setState({
			lastSavedNote: Object.assign({}, note),
			note: note,
			folder: folder,
		});
	}
	*/

	/*
	folderPickerOptions() {
		const options = {
			enabled: true,
			selectedFolderId: this.state.folder ? this.state.folder.id : null,
			onValueChange: this.folderPickerOptions_valueChanged,
		};

		if (this.folderPickerOptions_ && options.selectedFolderId === this.folderPickerOptions_.selectedFolderId) return this.folderPickerOptions_;

		this.folderPickerOptions_ = options;
		return this.folderPickerOptions_;
	}
	*/

	/*
	onBodyViewerLoadEnd() {
		shim.setTimeout(() => {
			this.setState({ HACK_webviewLoadingState: 1 });
			shim.setTimeout(() => {
				this.setState({ HACK_webviewLoadingState: 0 });
			}, 50);
		}, 5);
	}
	*/

	/*
	onBodyViewerCheckboxChange(newBody: string) {
		void this.saveOneProperty('body', newBody);
	}
	*/


	// render() {
		/*
		if (this.state.isLoading) {
			return (
				<View style={this.styles().screen}>
					<ScreenHeader />
				</View>
			);
		}
		*/

		/*
		if (this.state.showCamera) {
			return <CameraView themeId={this.props.themeId} style={{ flex: 1 }} onPhoto={this.cameraView_onPhoto} onCancel={this.cameraView_onCancel} />;
		}
		*/

		/*
		// Currently keyword highlighting is supported only when FTS is available.
		const keywords = this.props.searchQuery && !!this.props.ftsEnabled ? this.props.highlightedWords : emptyArray;
		*/

		/*
		if (this.state.mode == 'view' && !this.useBetaEditor()) {
			// Note: as of 2018-12-29 it's important not to display the viewer if the note body is empty,
			// to avoid the HACK_webviewLoadingState related bug.
			bodyComponent =
				!note || !note.body.trim() ? null : (
					<NoteBodyViewer
						onJoplinLinkClick={this.onJoplinLinkClick_}
						style={this.styles().noteBodyViewer}
						// Extra bottom padding to make it possible to scroll past the
						// action button (so that it doesn't overlap the text)
						paddingBottom={150}
						noteBody={note.body}
						noteMarkupLanguage={note.markup_language}
						noteResources={this.state.noteResources}
						highlightedKeywords={keywords}
						themeId={this.props.themeId}
						noteHash={this.props.noteHash}
						onCheckboxChange={this.onBodyViewerCheckboxChange}
						onMarkForDownload={this.onMarkForDownload}
						onLoadEnd={this.onBodyViewerLoadEnd}
					/>
				);
		} else {
			// bodyComponent = this.useBetaEditor()
			// 	// Note: blurOnSubmit is necessary to get multiline to work.
			// 	// See https://github.com/facebook/react-native/issues/12717#issuecomment-327001997
			// 	//
			// 	// 2020-10-16: As of React Native 0.63, the Markdown Editor no longer crashes in Android, however the
			// 	// cursor is still too unreliable to be usable, so we disable it in Android.
			// 	? <MarkdownEditor
			// 		ref={this.markdownEditorRef} // For focusing the Markdown editor
			// 		editorFont={editorFont(this.props.editorFont)}
			// 		style={this.styles().bodyTextInput}
			// 		previewStyles={this.styles().noteBodyViewer}
			// 		value={note.body}
			// 		borderColor={this.styles().markdownButtons.borderColor}
			// 		markdownButtonsColor={this.styles().markdownButtons.color}
			// 		saveText={(text:string) => this.body_changeText(text)}
			// 		blurOnSubmit={false}
			// 		selectionColor={theme.textSelectionColor}
			// 		keyboardAppearance={theme.keyboardAppearance}
			// 		placeholder={_('Add body')}
			// 		placeholderTextColor={theme.colorFaded}
			// 		noteBodyViewer={{
			// 			onJoplinLinkClick: this.onJoplinLinkClick_,
			// 			style: this.styles().noteBodyViewerPreview,
			// 			paddingBottom: 0,
			// 			webViewStyle: theme,
			// 			noteBody: note.body,
			// 			noteMarkupLanguage: note.markup_language,
			// 			noteResources: this.state.noteResources,
			// 			highlightedKeywords: keywords,
			// 			themeId: this.props.themeId,
			// 			noteHash: this.props.noteHash,
			// 			onCheckboxChange: this.onBodyViewerCheckboxChange,
			// 			onMarkForDownload: this.onMarkForDownload,
			// 			onLoadEnd: this.onBodyViewerLoadEnd,
			// 		}}

			// 	/>
			// 	:
			// 	// Note: In theory ScrollView can be used to provide smoother scrolling of the TextInput.
			// 	// However it causes memory or rendering issues on older Android devices, probably because
			// 	// the whole text input has to be in memory for the scrollview to work. So we keep it as
			// 	// a plain TextInput for now.
			// 	// See https://github.com/laurent22/joplin/issues/3041

			// 	// IMPORTANT: The TextInput selection is unreliable and cannot be used in a controlled component
			// 	// context. In other words, the selection should be considered read-only. For example, if the seleciton
			// 	// is saved to the state in onSelectionChange and the current text in onChangeText, then set
			// 	// back in `selection` and `value` props, it will mostly work. But when typing fast, sooner or
			// 	// later the real selection will be different from what is stored in the state, thus making
			// 	// the cursor jump around. Eg, when typing "abcdef", it will do this:
			// 	//     abcd|
			// 	//     abcde|
			// 	//     abcde|f
			// 	(
			// 		<TextInput
			// 			autoCapitalize="sentences"
			// 			style={this.styles().bodyTextInput}
			// 			ref="noteBodyTextField"
			// 			multiline={true}
			// 			value={note.body}
			// 			onChangeText={(text:string) => this.body_changeText(text)}
			// 			onSelectionChange={this.body_selectionChange}
			// 			blurOnSubmit={false}
			// 			selectionColor={theme.textSelectionColor}
			// 			keyboardAppearance={theme.keyboardAppearance}
			// 			placeholder={_('Add body')}
			// 			placeholderTextColor={theme.colorFaded}
			// 		/>
			// 	);

			bodyComponent = (
				<TextInput
					autoCapitalize="sentences"
					style={this.styles().bodyTextInput}
					ref="noteBodyTextField"
					multiline={true}
					value={note.body}
					onChangeText={(text: string) => this.body_changeText(text)}
					onSelectionChange={this.body_selectionChange}
					blurOnSubmit={false}
					selectionColor={theme.textSelectionColor}
					keyboardAppearance={theme.keyboardAppearance}
					placeholder={_('Add body')}
					placeholderTextColor={theme.colorFaded}
				/>
			);
		}
		*/

		/*
		const renderActionButton = () => {
			const buttons = [];

			buttons.push({
				title: _('Edit'),
				icon: 'md-create',
				onPress: () => {
					this.setState({ mode: 'edit' });

					this.doFocusUpdate_ = true;
				},
			});

			if (this.state.mode == 'edit') return null;

			return <ActionButton multiStates={true} buttons={buttons} buttonIndex={0} />;
		};
		*/

		/*
		const actionButtonComp = renderActionButton();
		*/

		/*
		// Save button is not really needed anymore with the improved save logic
		const showSaveButton = false; // this.state.mode == 'edit' || this.isModified() || this.saveButtonHasBeenShown_;
		const saveButtonDisabled = true;// !this.isModified();

		if (showSaveButton) this.saveButtonHasBeenShown_ = true;
		*/

		// const titleContainerStyle = isTodo ? this.styles().titleContainerTodo : this.styles().titleContainer;

		// const dueDate = Note.dueDateObject(note);

	// }

}
