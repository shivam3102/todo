export const getTodos = (userId, token) => {
    return fetch(`/api/todos/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getATodo = (userId, token, todoId) => {
    return fetch(`/api/todo/${todoId}/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const createTodo = (userId, token, todo) => {
    return fetch(`/api/todo/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const updateTodo = (userId, token, todoId, todo) => {
    return fetch(`/api/todo/update/${todoId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const deleteTodo = (userId, token, todoId) => {
    return fetch(`/api/todo/delete/${todoId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getCount = (userId, token) => {
    return fetch(`/api/count/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const createCount = (userId, token, count) => {
    return fetch(`/api/count/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(count)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


