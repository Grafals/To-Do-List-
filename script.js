const myFirstArray = [];

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#input1').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
    createCustomCursor();
    animateBackground();
});

function onEnter(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function addTodo() {
    const firstTodo = document.getElementById('input1').value.trim();
    if (firstTodo) {
        myFirstArray.push(firstTodo);
        document.getElementById('input1').value = '';
        renderTodos();
    } 
}

function renderTodos() {
    const todoList = document.getElementById('added-todo');
    todoList.innerHTML = '';
    for (let i = 0; i < myFirstArray.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = myFirstArray[i];

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteTask(i);
        };

        listItem.appendChild(deleteButton);
        listItem.onclick = () => {
            toggleCompletion(i);
        };

        todoList.appendChild(listItem);
    }
}

function deleteTask(index) {
    myFirstArray.splice(index, 1);
    renderTodos();
}

function toggleCompletion(index) {
    const listItem = document.getElementById('added-todo').children[index];
    listItem.classList.toggle('completed');
}

function createCustomCursor() {
    const cursor = document.getElementById('customCursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block'; // Ensure the cursor is visible
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }

    function createTrail() {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        document.body.appendChild(trail);
        trail.style.left = `${cursorX}px`;
        trail.style.top = `${cursorY}px`;
        setTimeout(() => {
            trail.remove();
        }, 500);
    }

    document.addEventListener('mousemove', createTrail);

    animateCursor();
}

function animateBackground() {
    const canvas = document.getElementById('backgroundCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    let particles = [];
    let mouse = { x: 0, y: 0 };

    function createStars() {
        for (let i = 0; i < 200; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                alpha: Math.random() * 0.5 + 0.5,
                speed: Math.random() * 0.1 + 0.05
            });
        }
    }

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 1,
                color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`
            });
        }
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw stars
        /*stars.forEach(star => {
            star.x += (mouse.x - star.x) * star.speed;
            star.y += (mouse.y - star.y) * star.speed;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.fill();
        });
*/
        // Draw particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(updateCanvas);
    }

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    createStars();
    createParticles();
    updateCanvas();
}
