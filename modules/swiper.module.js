import { classes } from "./general.js";

export const carouselFunc = (() => {
    function init() {
        document.querySelectorAll(classes.dot_books).forEach(booksList => {
            enableDragScroll(booksList);
        });
    }
    
    function enableDragScroll(booksList) {
        let pos = { top: 0, left: 0, x: 0, y: 0 };
        
        const mouseDownHandler = function(e) {
            booksList.style.cursor = 'grabbing';
            booksList.style.userSelect = 'none';
            
            pos = {
                left: booksList.scrollLeft,
                top: booksList.scrollTop,
                x: e.clientX,
                y: e.clientY,
            };
            
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
        
        const mouseMoveHandler = function(e) {
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;
            
            booksList.scrollLeft = pos.left - dx;
            booksList.scrollTop = pos.top - dy;
        };
        
        const mouseUpHandler = function() {
            booksList.style.cursor = 'grab';
            booksList.style.removeProperty('user-select');
            
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        
        booksList.addEventListener('mousedown', mouseDownHandler);
        booksList.style.cursor = 'grab';
    }
    
    function refresh() {
        document.querySelectorAll(classes.dot_books).forEach(booksList => {
            booksList.scrollLeft = 0;
        });
    }
    
    return { init, refresh };
})();