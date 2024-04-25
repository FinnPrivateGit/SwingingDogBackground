
const dog = document.getElementById('dog');
dog.style.zIndex = -1;

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;
const Constraint = Matter.Constraint;

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

const dogBody = Bodies.rectangle(100, 100, 100, 100, { inertia: Infinity, render: { visible: false }});

// create rope constraint
const rope = Constraint.create({
    bodyA: dogBody,
    pointB: { x: window.innerWidth / 2, y: 0 },
    length: window.innerHeight * 0.5,
    stiffness: 0.15,
    render: { visible: false }
});

//rope.style.zIndex = 1;

// Create a MouseConstraint
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

World.add(engine.world, [dog, dogBody, rope, mouseConstraint]);
Render.run(render);
Engine.run(engine);

function update() {
    dog.style.left = dogBody.position.x - 50 + 'px';
    dog.style.top = dogBody.position.y -50 + 'px';

    const ropeElement = document.getElementById('rope');
    ropeElement.style.zIndex = -2; //rope behind dog
    const deltaY = rope.bodyA.position.y - rope.pointB.y;
    const deltaX = rope.bodyA.position.x - rope.pointB.x;
    const angleInDegrees = (Math.atan2(deltaY, deltaX) * 180 / Math.PI) - 90;

    ropeElement.style.height = Math.sqrt(deltaX * deltaX + deltaY * deltaY) + 'px';
    ropeElement.style.left = (rope.pointB.x - ropeElement.offsetWidth / 2) + 'px';
    ropeElement.style.top = rope.pointB.y + 'px';
    ropeElement.style.transformOrigin = "top";
    ropeElement.style.transform = `rotate(${angleInDegrees}deg)`;

    requestAnimationFrame(update);
}

update();

