const baseUrls = 'http://localhost:8080/todos';

export const loadTodos = () => {
  return fetch(baseUrls)
    .then(res => res.json())
}
