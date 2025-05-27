const ChatAnswer = () => {
	return (
		<div className="w-fit h-fit px-3 py-2">
			Why not just use inline styles? A common reaction to this approach is wondering, “isn’t this just inline styles?”
			and in some ways it is — you’re applying styles directly to elements instead of assigning them a class name and
			then styling that class. But using utility classes has many important advantages over inline styles, for example:
			Designing with constraints — using inline styles, every value is a magic number. With utilities, you’re choosing
			styles from a predefined design system, which makes it much easier to build visually consistent UIs. Hover, focus,
			and other states — inline styles can’t target states like hover or focus, but Tailwind’s state variants make it
			easy to style those states with utility classes. Media queries — you can’t use media queries in inline styles, but
			you can use Tailwind’s responsive variants to build fully responsive interfaces easily. This component is fully
			responsive and includes a button with hover and active styles, and is built entirely with utility classes:
		</div>
	);
};

export default ChatAnswer;
