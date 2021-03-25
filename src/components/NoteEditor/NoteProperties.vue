<template>
	<div>
		<title>Note properties</title>
		<div>
			<div class="note-property-box">
				<label>Updated</label>
				<div>03/15/2021 14:00</div>
				<a href="#">
					<button title="Edit" />
				</a>
			</div>
			<div class="note-property-box">
				<label>Created</label>
				<div>03/14/2021 01:17</div>
				<a href="#">
					<button title="Edit" />
				</a>
			</div>
			<div class="note-property-box">
				<label>URL</label>
				<a href="#">
				</a>
				<a href="#">
					<button title="Edit" />
				</a>
			</div>
			<div class="note-property-box">
				<label>Location</label>
				<a href="#">
				</a>
				<a href="#">
					<button title="Edit" />
				</a>
			</div>
			<div class="note-property-box">
				<label>Note History</label>
				<a href="#">Previous versions of this note</a>
			</div>
			<div>
				<label>Markup</label>
				<div>Markdown</div>
			</div>
			<div class="note-property-box" >
				<label >ID</label>
				<div>6396807806f6466287d4492da67acb11</div>
			</div>
		</div>
		<div>
			<button>OK</button>
			<button>Cancel</button>
		</div>
	</div>
</template>

<script>

const NoteScreen = connect((state) => {
	return {
		noteId: state.selectedNoteIds.length ? state.selectedNoteIds[0] : null,
		noteHash: state.selectedNoteHash,
		folderId: state.selectedFolderId,
		itemType: state.selectedItemType,
		folders: state.folders,
		searchQuery: state.searchQuery,
		sharedData: state.sharedData,
		showSideMenu: state.showSideMenu,
		provisionalNoteIds: state.provisionalNoteIds,
		highlightedWords: state.highlightedWords,
	};
})(NoteScreenComponent);

</script>
