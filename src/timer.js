export class Timer
{
	constructor()
	{
		this.count = 100;
	}
	update()
	{
		this.count -= 1;
	}
	reset()
	{
		this.count = 100
	}
}
