class Vector {

    constructor(x,y){
        this._x = x;
        this._y = y
    }

    /*
     * S T A T I C   M E T H O D S  
     *
     * - kahden vektorin (päätepisteiden) välinen etäisyys
     */ 
    static distanceOf(a, b) {

        let deltaY = a.getY() - b.getY();
        let deltaX = a.getX() - b.getX(); 

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    }

    /*
     * I N S T A N C E   M E T H O D S
     */
    add = (v2) => {

        return new Vector(
            this._x + v2.getX(),
            this._y + v2.getY()
        )
    }

    divide = (val) => {

        return new Vector(
            this._x / val,
            this._y / val
        )

    }

    getAngle = () => {
        return Math.atan2(this._y, this._x)
    }



    getLength = () => {
        return Math.sqrt(
            Math.pow(this._x, 2) + Math.pow(this._y, 2)
        )
    }

    getX = () => {
        return this._x;
    }

    getY = () => {
        return this._y
    }

    setAngle = (angle) => {
        let length = this.getLength();

        return new Vector (
            Math.cos(angle) * length,
            Math.sin(angle) * length
        )
    }

    setLength = (length) => {
        let angle = this.getAngle();

        return new Vector (
            Math.cos(angle) * length,
            Math.sin(angle) * length
        )
    }

    /*
     * Palauttaa uuden (päivitetyn) objektin
     */
    setX = (value) => {
    
        return new Vector(
            value,
            this._y
        )    

    }

    /*
     *
     */
    setY = (value) => {

        return new Vector(
            this._x,
            value
        )

    }

    subtract = (v2) => {

        return new Vector(
            this._x - v2.getX(),
            this._y - v2.getY()
        )

    }

}

/*
 * @param x olion keskipisteen x-koordinaatti
 * @param y olion keskipisteen y-koordinaatti
 * @param speed oliota liikuttavan voiman määrä
 * @param direction oliota liikuttavan voiman suunta
 * 
 * https://bl.ocks.org/veltman/995d3a677418100ac43877f3ed1cc728
 */
class Boid {

    constructor(
        x,
        y, 
        speed, 
        direction, 
        id, 
        radius=4, 
        width, 
        height, 
        underObservation=false, 
        perceived=false, 
        alignmentPoint = null, 
        cohesionPoint=null,
        separationPoint = null
        ){

        this._position = new Vector(x, y,speed, direction);

        this._velocity = new Vector(0,0)
            .setLength(speed)
            .setAngle(direction)
            
        this._id = id;
        this._radius = radius;

        // Alueen rajat
        this._width = width;
        this._height = height;

        this._halfOfWidth = this._width / 2;
        this._halfOfHeight = this._height / 2;

        /*
         * D3 graafissa voidaan seurata valitun objektin liikettä,
         * tällöin havaintoetäisyyden sisällä olevat objektit 
         * korostetaan täytevärillä
         */
        this._underObservation = underObservation;
        this._perceived = perceived;

        /*
         *
         *
         */
        this._alignmentPoint = alignmentPoint

        /*
         * Naapurustoon kuuluvien objektien keskipiste
         * - average position (center of mass) of local flockmates
         * - käytössä kun seurataan jotain määrättyä objektia
         */
        this._cohesionPoint = cohesionPoint

        this._separationPoint = separationPoint
    }


    /*
     * Päivitetään:
     * - sijaintia aktiivisella liikevoimalla
     * - liikevoimaa uudella 
     * 
     * @todo: Pitääkö velocityä kääntää, kun törmätään laitaan...
     */
    accelerate = (vec, maxSpeed) => {

/*
 * S T E E T I N G
 *
 * - desired velocity: lähiympäristön objektien mukaa laskettu haluttu suunta
 * - velocity: nykyinen suunta
 * 
 * Käännetään liikesuuntaa haluttua kohti:
 * newVelocity = desired - velocity
 * 
 * https://www.youtube.com/watch?v=mhjuuHl6qHM&t=716s
 * 
 * let newVelocity = this._velocity.subtract(vec)
 * let newVelocity = vec.subtract(this._velocity) EI TOIMI, ALKAA POMPOTTAA..
 */

//let newVelocity = this._velocity.subtract(vec)
let newVelocity = this._velocity.add(vec)
newVelocity = newVelocity.setLength(maxSpeed)

        /*
        if(this.getId() === 'b-0'){
            console.log("VEL: ", this._velocity.getX(), this._velocity.getY())
            console.log("DES: ", vec.getX(), vec.getY())
            console.log("NEW V: ", newVelocity.getX(), newVelocity.getY())
        }
        */

        let newPosition = this._position.add(this._velocity)


        /*
         * X - Akselin suuntainen tarkistus & korjaus
         */
        if(newPosition.getX() + this._radius > this._halfOfWidth) {
            newPosition = newPosition.setX(this._halfOfWidth - this._radius);
newVelocity = newVelocity.setX(newVelocity.getX() * -1)
        }

        if(newPosition.getX() - this._radius < -this._halfOfWidth) {
            newPosition = newPosition.setX(-this._halfOfWidth + this._radius);
newVelocity = newVelocity.setX(newVelocity.getX() * -1)
        }
        
        /*
         * Y - akselin suuntainen tarkistus & korjaus
         */
        if(newPosition.getY() + this._radius > this._halfOfHeight) {
            newPosition = newPosition.setY(this._halfOfHeight - this._radius);
newVelocity = newVelocity.setY(newVelocity.getY() * -1)
        }

        if(newPosition.getY() - this._radius < -this._halfOfHeight) {
            newPosition = newPosition.setY(-this._halfOfHeight + this._radius);
newVelocity = newVelocity.setY(newVelocity.getY() * -1)
        } 

        return new Boid(
            newPosition.getX(),
            newPosition.getY(),
            newVelocity.getLength(),
            newVelocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived
        )

    }

    getAlignmentPoint = () => {
        return this._alignmentPoint;
    }

    getCohesionPoint = () => {
        return this._cohesionPoint;
    }

    getId = () => {
        return this._id
    }

    getRadius = () => {
        return this._radius
    }

    getSeparationPoint = () => {
        return this._separationPoint;
    }

    getVector = () => {
        return this._position;
    }

    getVelocity = () => {
        return this._velocity;
    }

    isPerceived = () => {
        return this._perceived
    }

    isUnderObservation = () => {
        return this._underObservation
    }

    setAlignmentPoint = (val) => {

        return new Boid(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived,
            val,
            this._cohesionPoint,
            this._separationPoint
        )
    }
    
    setCohesionPoint = (val) => {

        return new Boid(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived,
            this._alignmentPoint,
            val,
            this._separationPoint
        )
    }

    setPerceived = (val) => {

        this._perceived = val;

        return new Boid(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived
        )
    }

    setSeparationPoint = (val) => {

        return new Boid(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived,
            this._alignmentPoint,
            this._cohesionPoint,
            val
        )
    }

    setUnderObservation = (val) => {

        this._underObservation = val;

        return new Boid(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this.getId(),
            this._radius,
            this._width,
            this._height,
            this._underObservation,
            this._perceived
        )
    }

}

export {
    Boid,
    Vector
};