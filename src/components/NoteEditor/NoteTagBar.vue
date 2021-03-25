<template>
  <NoteTagBar />
</template>

    <script>
function renderTagButton() {
  return (
    <ToolbarButton
      themeId={props.themeId}
      toolbarButtonInfo={props.setTagsToolbarButtonInfo}
    />
  );
}

function renderTagBar() {
  const noteIds = [formNote.id];
  const instructions = (
    <span
      onClick={() => {
        void CommandService.instance().execute("setTags", noteIds);
      }}
      style={{ ...theme.clickableTextStyle, whiteSpace: "nowrap" }}
    >
      {_("Click to add tags...")}
    </span>
  );
  const tagList = props.selectedNoteTags.length ? (
    <TagList items={props.selectedNoteTags} />
  ) : null;

  return (
    <div
      style={{
        paddingLeft: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {tagList}
      {instructions}
    </div>
  );
}

class TagItem{
	render() {
		return <span>{this.props.title}</span>;
	}
}

function TagList(themeId, style, items) {
	const style = useMemo(() => {
		const theme = themeStyle(props.themeId);

		const output = { ...props.style };
		output.display = 'flex';
		output.flexDirection = 'row';
		output.boxSizing = 'border-box';
		output.fontSize = theme.fontSize;
		output.whiteSpace = 'nowrap';
		output.paddingTop = 8;
		output.paddingBottom = 8;
		return output;
	}, [props.style, props.themeId]);

	const tags = useMemo(() => {
		const output = props.items.slice();

		output.sort((a, b) => {
			return a.title < b.title ? -1 : +1;
		});

		return output;
	}, [props.items]);

	const tagItems = useMemo(() => {
		const output = [];
		for (let i = 0; i < tags.length; i++) {
			const props = {
				title: tags[i].title,
				key: tags[i].id,
			};
			output.push(<TagItem {...props} />);
		}
		return output;
	}, [tags]);

	return (
		<div className="tag-list" style={style}>
			{tagItems}
		</div>
	);
}

</script>