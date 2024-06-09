import { linear_search } from "./search";

const verify = index => {
    if(index == null) {
        console.log("Target not found!");
    } else {
        console.log(`Target found in the list at index: ${index}`)
    }
}

const result = linear_search(list, 11);
verify(result)