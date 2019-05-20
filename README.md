# Lab 3 - React Notes

In this lab, I used the React framework to design my Notes App that includes a Note and input bar component. I then used Firebase to create a live backend that allowed for changes in realtime. 

The app allows the user to create, drag, edit and delete notes. 

# What did and did not worked 

Adding and deleting notes went pretty smoothly, as did the Draggable component which I did not expect. SA3 and SA4 definitely helped in my understanding there. 

However, it was difficult to understand the connections between components and this made it pretty hard to write the update/isEditing based functions. 

Firebase went relatively smoothly as well! 

# Extra Credit 

1. Notes do not go out of bounds! Note snaps back to the position was at before being dragged on the left and upper boundaries, but allows for expansion of the screen on the right and the bottom in the off chance that a lot of notes need to be created. 
2. zIndex functionality! It was hard and took a long time and then when I added firebase functionality it stopped working. 
3. Finally, notes were responsive to size. Inputing a large text block or image will lead to increase in the note's size rather than a hidden overflow. 