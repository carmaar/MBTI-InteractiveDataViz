let data = 
    [['ENFJ', 2.5,"A Protagonist (ENFJ) is a person with the Extraverted, Intuitive, Feeling, and Judging personality traits. These warm, forthright types love helping others, and they tend to have strong ideas. They back their perspective with the creative energy to achieve their goals."],
    ['ENFP', 8.10,"A Campaigner (ENFP) is someone with the Extraverted, Intuitive, Feeling, and Prospecting personality traits. These people tend to embrace big ideas and actions that reflect their sense of hope and goodwill toward others. Their vibrant energy can flow in many directions."],
    ['ENTJ', 1.80,"A Commander (ENTJ) is someone with the Extraverted, Intuitive, Thinking, and Judging personality traits. They are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them."],
    ['ENTP', 3.20,"A Debater (ENTP) is a person with the Extraverted, Intuitive, Thinking, and Prospecting personality traits. They tend to be bold and creative, deconstructing and rebuilding ideas with great mental agility. They pursue their goals vigorously despite any resistance they might encounter."],
    ['ESFJ', 12.30,"A Consul (ESFJ) is a person with the Extraverted, Observant, Feeling, and Judging personality traits. They are attentive and people-focused, and they enjoy taking part in their social community. Their achievements are guided by decisive values, and they willingly offer guidance to others."],
    ['ESFP', 8.50,"An Entertainer (ESFP) is a person with the Extraverted, Observant, Feeling, and Prospecting personality traits. These people love vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They can be very social, often encouraging others into shared activities."],
    ['ESTJ', 8.70,"An Executive (ESTJ) is someone with the Extraverted, Observant, Thinking, and Judging personality traits. They possess great fortitude, emphatically following their own sensible judgment. They often serve as a stabilizing force among others, able to offer solid direction amid adversity."],
    ['ESTP', 4.30,"An Entrepreneur (ESTP) is someone with the Extraverted, Observant, Thinking, and Prospecting personality traits. They tend to be energetic and action-oriented, deftly navigating whatever is in front of them. They love uncovering life’s opportunities, whether socializing with others or in more personal pursuits."],
    ['INFJ', 1.50,"An Advocate (INFJ) is someone with the Introverted, Intuitive, Feeling, and Judging personality traits. They tend to approach life with deep thoughtfulness and imagination. Their inner vision, personal values, and a quiet, principled version of humanism guide them in all things."],
    ['INFP', 4.40,"A Mediator (INFP) is someone who possesses the Introverted, Intuitive, Feeling, and Prospecting personality traits. These rare personality types tend to be quiet, open-minded, and imaginative, and they apply a caring and creative approach to everything they do."],
    ['INTJ', 2.10,"An Architect (INTJ) is a person with the Introverted, Intuitive, Thinking, and Judging personality traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one."],
    ['INTP', 3.30,"A Logician (INTP) is someone with the Introverted, Intuitive, Thinking, and Prospecting personality traits. These flexible thinkers enjoy taking an unconventional approach to many aspects of life. They often seek out unlikely paths, mixing willingness to experiment with personal creativity."],
    ['ISFJ', 13.80,"A Defender (ISFJ) is someone with the Introverted, Observant, Feeling, and Judging personality traits. These people tend to be warm and unassuming in their own steady way. They’re efficient and responsible, giving careful attention to practical details in their daily lives."],
    ['ISFP', 8.80,"An Adventurer (ISFP) is a person with the Introverted, Observant, Feeling, and Prospecting personality traits. They tend to have open minds, approaching life, new experiences, and people with grounded warmth. Their ability to stay in the moment helps them uncover exciting potentials."],
    ['ISTJ', 11.60,"A Logistician (ISTJ) is someone with the Introverted, Observant, Thinking, and Judging personality traits. These people tend to be reserved yet willful, with a rational outlook on life. They compose their actions carefully and carry them out with methodical purpose."],
    ['ISTP', 5.40,"A Virtuoso (ISTP) is someone with the Introverted, Observant, Thinking, and Prospecting personality traits. They tend to have an individualistic mindset, pursuing goals without needing much external connection. They engage in life with inquisitiveness and personal skill, varying their approach as needed."]];

let personalities = [];

let angle = Math.PI * 2 / data.length;
  
let origin;

let canvasSize = 800;

let unitScale = 20;

let rotation = Math.PI / 32 * 9;

let isTextDisplayed = false;

let maxPercent = 13.8;


// ========================SETUP===========================
function setup() {
  createCanvas(canvasSize, canvasSize);
  
  textFont('Overpass');
  
  // center 
  origin = createVector(canvasSize / 2, canvasSize / 2);
  // fill personalities array
  for (i = 0; i < data.length; i++) {
    personalities.push(new Personality(data[i][0], data[i][1], angle * i, data[i][2]));
  }
}

// =======================DRAW===============================
function draw() {
  background('#4C4D53');
  personalities.forEach(function(e) {
    e.drawPersonality();
  });
  
  for (i = personalities.length - 1; i >= 0; i--) {
    personalities[i].mouseOverCheck();
  }
  
  //title
  push()
  textAlign(CENTER, CENTER)
  text
  textSize(40);
  fill('white');
  text('MYERS-BRIGGS TYPE INDICATOR', canvasSize / 2, 710);
  textSize(30);
  fill('#E79881')
  text('Frequency of types among the US population', canvasSize / 2, 745);
  pop()
}

// ================CLASS DEF================================

class Personality {
  constructor(name, percent, angle, info) {
    this.name = name;
    this.info = info;
    this.percent = percent;
    this.vector = p5.Vector.fromAngle(angle + rotation,(((maxPercent / 2.7) + ((maxPercent - maxPercent / 2.7) * (percent / maxPercent))) * unitScale));
    
    //change for different size center
    this.offsetScaler = unitScale * .5; 
    this.centerOffset =
      p5.Vector.fromAngle(this.vector.heading(),
                          this.vector.mag() -
                          this.offsetScaler);

    if(name[0] == 'E') {
      this.color = "#D8AB65";
    } else {
      this.color = "#798787";
    }
    this.isMouseOver = false;
    
  }
  
  drawPersonality() {
    // draw line
    line(origin.x + (this.vector.x - this.centerOffset.x),
         origin.y + (this.vector.y - this.centerOffset.y),
         this.vector.x + origin.x,
         this.vector.y + origin.y);
    // draw circle
    push()
    noStroke();
    fill(this.color);
    circle(this.vector.x + origin.x,
           this.vector.y + origin.y,
           this.vector.mag() / 2);
    pop()
    // draw percentages
    push()
    fill('#ffffff');
    textSize(20);
    textAlign(CENTER,CENTER);
    text(this.percent + "%",
         this.vector.x + origin.x,
         this.vector.y + origin.y);
    pop()
  }
  
  // check if mouse is hovering over circle => display text
  mouseOverCheck() {
    if (!isTextDisplayed && this.vector.mag() / 2 / 2 >
        dist(mouseX,
             mouseY,
             this.vector.x + origin.x,
             this.vector.y + origin.y)) 
    { 
      isTextDisplayed = true;
      push();
      textSize(45);
      fill("#E79881");
      text(this.name, 20, 45);
      
      push();
      textSize(25);
      fill('white');
      text(this.info, 20, 60, canvasSize - 30, canvasSize);
      pop();
      pop();
    } else {
      isTextDisplayed = false;
    }
  }
}

