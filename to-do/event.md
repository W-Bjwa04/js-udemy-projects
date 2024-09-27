# Event Bubbling
    Definition: Event bubbling is a mechanism in the DOM (Document Object Model) where an event that occurs on a child element first triggers the event handler on that child, and then propagates upward to its parent elements, triggering their respective event handlers in the process. This continues up the DOM tree until it reaches the root element, allowing parent elements to respond to events that happen on their children.

```html
    <div id="parent">
        <button id="child">Click me!</button>
    </div>

    <script>
        document.getElementById('parent').addEventListener('click', () => {
            console.log('Parent clicked');
        });

        document.getElementById('child').addEventListener('click', () => {
            console.log('Child clicked');
        });
    </script>
```



# Event Delegation
    Definition: Event delegation is a programming technique that involves attaching a single event listener to a parent element instead of multiple event listeners to each child element. It leverages the event bubbling mechanism, allowing the parent element to handle events that occur on its child elements. This approach improves performance and simplifies code by reducing the number of event listeners needed, making it easier to manage events for dynamic lists of elements.

```html

<ul id="task-list">
    <li>Task 1 <button class="remove-btn">Remove</button></li>
    <li>Task 2 <button class="remove-btn">Remove</button></li>
</ul>

<script>
    document.getElementById('task-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            console.log('Remove button clicked');
        }
    });
</script>






```