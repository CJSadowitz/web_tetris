export class Game_Input
{
	constuctor()
	{
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;
	}
	update_key(type)
	{
		console.log("Update_Key");
		switch (type)
		{
			case (0): // up key
				this.up = true; // could condense all of this to two bits
				this.down = false;
				this.left = false;
				this.right = false;
				break;
			case (1): // down key
				this.up = false;
				this.down = true;
				this.left = false;
				this.right = false;
				break;
			case (2): // left key
				this.up = false;
				this.down = false;
				this.left = true;
				this.right = false;
				break;
			case (3): // right key
				this.up = false;
				this.down = false;
				this.left = false;
				this.right = true;
				break;
		}
	}
	key_listener()
	{
       		document.addEventListener('keydown', (event) =>
        	{
                	switch (event.key)
                	{
				case ('ArrowUp'):
					this.update_key(0);
					console.log('Up arrow pressed');
					break;
	                        case ('ArrowDown'):
					this.update_key(1);
        	                        console.log('Down arrow pressed');
                	                break;
	                        case ('ArrowLeft'):
					this.update_key(2);
        	                        console.log('Left arrow pressed');
                	                break;
	                        case ('ArrowRight'):
					this.update_key(3);
        	                        console.log('Right arrow pressed');
                	                break;
	                        default:
        	                        console.log('Other key was pressed');
                	                break;
	                }
	        });
	}
}

