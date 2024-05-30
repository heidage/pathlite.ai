// get Response from chatgpt
export default async function getResponse(message: string){
    try{
        const response = await fetch('http://127.0.0.1:8000/getResponse',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"question":message})
        })
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        return data.answer;
    } catch (error) {
        console.error(error);
        return "Error in getting reponse";
    }
}