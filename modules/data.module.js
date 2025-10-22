export const DM = (() => {
    let bookList = []; 
    let loaded = false;

    const loadPromise = fetch('https://my-json-server.typicode.com/kurtinagthb/books-project-js/books')
        .then(res => res.json())
        .then(data => bookList = data) 
        .catch(error => {
            console.log('Ошибка загрузки:', error);
            bookList = []; 
        });

    async function getBookList() {
         if (!loaded) {
            await loadPromise;
            loaded = true;
        }
        return bookList;
    }
    
    return { getBookList };
})();