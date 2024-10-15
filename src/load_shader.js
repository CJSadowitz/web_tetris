export async function load_shader(path)
{
	const response = await fetch(path);
	const source_data = await response.text();
	return source_data;
}
// I really hate 'promises' and async functions :)
