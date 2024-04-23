const dog = document.getElementById('dog');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint; //not in original code

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
    }
});

const dogBody = Bodies.rectangle(100, 100, 100, 100, { inertia: Infinity });

// create rope constraint
const rope = Constraint.create({
    bodyA: dogBody,
    pointB: { x: window.innerWidth / 2, y: 0 },
    length: window.innerHeight * 0.5,
    stiffness: 0.15
});

// Create a MouseConstraint
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

World.add(engine.world, [dogBody, rope, mouseConstraint]);
Render.run(render);
Engine.run(engine);

function update() {
    dog.style.left = dogBody.position.x + 'px';
    dog.style.top = dogBody.position.y + 'px';
    requestAnimationFrame(update);
}
update();

// Update the position of the dog and the rope
setInterval(function() {
    const ropeElement = document.getElementById('rope');
    ropeElement.style.height = dogBody.position.y + 'px';
}, 1000 / 60);