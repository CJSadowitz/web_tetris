export function key_listener()
{
	document.addEventListener('keydown', function(event)
	{
		switch (event.key)
		{
			case ('ArrowUp'):
				console.log('Up arrow pressed');
				break;
			case ('ArrowDown'):
				console.log('Down arrow pressed');
				break;
			case ('ArrowLeft'):
				console.log('Left arrow pressed');
				break;
			case ('ArrowRight'):
				console.log('Right arrow pressed');
				break;
			default:
				console.log('Other key was pressed');
				break;
		}
	});
}
