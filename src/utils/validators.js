export function validateEmptyAndLength3(value) {
    if(!value) return "*Este campo é obrigatório"

    if(value.length < 3) return "*Este campo deve ter no mínimo 3 caracteres"

    return true
}

export function validateEmptyAndEmail(value){
    if(!value) return "*Este campo é obrigatório"

    // const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
    // if(!emailRegex) return "*Este campo precisa ser um email"

    return true
}