export async function json(request, response) {
    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk)  //acumulando todos os pedacinhos em um arquivo
    }
    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null;
    }
    response.setHeader('Content-type', 'application/json');
}