import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
With the body part given,
 Give a suitable timed warm up
 generate a gym based workout plan which has individual detailed 
 exercises for that body part with reps and sets, each exercise on a separate line.
 Suggest a suitable cool-down
 Do not list these

 and then generate a meal plan for 3 healthy protein based meals and 
 3 snacks in between the meals


`;
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

    const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.2,
    max_tokens: 500,
    });

    // const basePromptOutput = baseCompletion.data.choices.pop();
    // res.status(200).json({ output: basePromptOutput });

    // const secondPrompt = 
    // `
    // Take the list of ingredients of the recipe and Generate a detailed step by step healthy eating recipe with lots of plant based foods with the ingredients mentioned. generate a recipe in the style of Jamie Oliver. Use recipes that are quick and easy.

    // Ingredients: ${req.body.userInput}

    // Shopping List: ${basePromptOutput.text}

    // Recipe:
    // `

    // const secondPromptCompletion = await openai.createCompletion({
    // model: 'text-davinci-002',
    // prompt: `${secondPrompt}`,
    // temperature: 0.25,
    // max_tokens: 1250,
    // })
    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput })
};

export default generateAction;