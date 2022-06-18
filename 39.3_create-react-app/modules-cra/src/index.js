import { choice, remove } from './helpers'
import { fruits } from './foods'

const randFruit = choice(fruits)
console.log(`I'd like one ${randFruit}, please.`)
console.log(`Here you go: ${randFruit}`)
console.log(`Delicious! May I have another?`)
const newFruits = remove(fruits, randFruit)
console.log(`I'm sorry, we're all out. We have ${newFruits.length} left.`)
