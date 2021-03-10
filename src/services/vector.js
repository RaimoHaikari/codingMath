/* 
 * add, divide, multiply palauttaa aina uuden, päivitetyn objektin!
 * - Redux -päivitykset (muistaakseni) edellyttää uutta objektia...
 */
class Vector {

    constructor(x,y) {

        this._x = x;
        this._y = y;

    }

    /*
     * S T A T I C   M E T H O D S
     */ 
    static equals(a, b) {
        return (a.getX() === b.getX() && a.getY() === b.getY())
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
        return this._x
    }

    getY = () => {
        return this._y
    }

    printDescription = () => {
        console.log(`x: ${this._x}, y: ${this._y}`)
    }

    multiply = (val) => {

        return new Vector (
            this._x * val,
            this._y * val
        )
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
 * - Partikkelilla on paikka, eli position.
 * - Velocity määrittää kuinka paljo ja mihinkä suuntaan Partikkeli liikkuu,
 *   eli kuinka sijaintia korjataan
 * - Liike ei ole tasaista, vaan sen määrää säädellään gravityn -arvolla.
 *   Ajan myötä ylös nostava voima hiipuu ja partikkeli alkaa painua
 *   kiihtyvällä tahdilla kohti maata.
 */
class Partile {

    constructor(x,y, speed, direction, color) {

        this._position = new Vector(x,y)

        /*
         * redux:in vuoksi muutokset toteutetaan uuden aina objektin avulla
         */
        this._velocity = new Vector(0,0)
            .setLength(speed)
            .setAngle(direction)
            

        this._gravity = new Vector(0, 0.1)

        this._color = color

    }

    accelerate = () => {

        let newVelocity = this._velocity.add(this._gravity)
        let newPosition = this._position.add(this._velocity)

        return new Partile(
            newPosition.getX(),
            newPosition.getY(),
            newVelocity.getLength(),
            newVelocity.getAngle(),
            this._color
        )

    }

    getColor = () => {
        return this._color;
    }

    getVector = () => {
        return this._position;
    }

    update = () => {

        let newPosition = this._position.add(this._velocity)

        return new Partile(
            newPosition.getX(),
            newPosition.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this._color
        )
    }

}

/*
 * Coding Math: Episode 10 - Advanced Acceleration
 * https://www.youtube.com/watch?v=4UPiT5lDYe8
 */

class Ship {

    /*
     * Alussa:
     * - kohde sijaitsee parametrien määrittämässä pisteessa
     * - eikä liikettä ole. Rekisteröidään silti perustaso, jota käytetään 
     *   lähtökohtana uusia arvoja laskiessa.
     * 
     * Napataan talteen myös piirtoalueen koko. 
     * Oletuksena on, että liikutettava kohde sijoitetaan g-elementtiin, joka 
     * keskitetään piirtoalueen keskustaan. Eli vasemman laidan x-koordinaatti
     * on -width/2....
     * 
     * @param x aluksen keskipisteen x-koordinaatti
     * @param y aluksen keskipisteen y-koordinaatti
     * @param speed alusta liikuttavan voiman määrä
     * @param direction alusta liikuttavan voiman suunta
     * @param width ANIMAATION esittämiseen käytetyn SVG-elementin leveys
     * @param height ANIMAATION esittämiseen käytettävän SVG-elementin korkeus
     * @param xScale alusta esittävän elementin leveyden skaalaus
     * @param yScale alusta esittävän elementin korkeudn skaalaus
     * @param rotation mihinkä suuntaan aluksen nokka osoittaa
     * 
     */
    constructor(x,y,speed, direction, width, height, xScale, yScale, rotation = 0) {

        this._position = new Vector(x,y)

        this._velocity = new Vector(0,0)
            .setLength(speed)
            .setAngle(direction)

        this._width = width
        this._height = height

        this._xScale = xScale
        this._yScale = yScale

        /*
         * Mihin suuntaan aluksen nokka sojottaa.
         * - kun kiihdytetää, suuntautuu voima siihen suuntaan mihin aluksen nokka osoittaa
         */
        this._rotation = rotation
        //this._velocity.setLength(speed)
        //this._velocity.setAngle(direction)
    }

    /*
     * - päivitetään vallitseva 'liikkeen' voima kiihtyvyyden arvolla
     */
    accelerate = (vec) => {

        let halfWidthOfShip = 50 * this._xScale;
        let halfHeightOfShip = 50 * this._yScale;
    
        let newVelocity = this._velocity.add(vec)
        let newPosition = this._position.add(newVelocity) // Pitäskö olla vanha vai päivitetty

        /*
         * Mikäli kohde ajatuu reuna ulkopuolelle, palautetaan se alueelle vastakkaisen reunan puolelta
         *
         * - kohde on reunan ulkopuolella, kun sen perä on kadonnut näkyvistä, joten vähennetään
         *   keskipisteen sijainnista aluksen pituus.
         */
        if(newPosition.getX() - halfWidthOfShip > (this._width/2)){

            console.log(this._yScale, halfHeightOfShip, "............")
            let uusiX = (this._width/-2) - halfHeightOfShip;
            newPosition = newPosition.setX(uusiX)
        }

        if(newPosition.getX() + halfWidthOfShip < (this._width/-2)){
            let uusiX = (this._width/2) + halfHeightOfShip;
            newPosition = newPosition.setX(uusiX)
        }

        if(newPosition.getY() + halfHeightOfShip < (this._height/-2)){
            let uusiY = (this._height/2) + halfHeightOfShip
            newPosition = newPosition.setY(uusiY)
        }

        if(newPosition.getY() - halfHeightOfShip > (this._height/2)){
            let uusiY = (this._height/-2) - halfHeightOfShip
            newPosition = newPosition.setY(uusiY)
        }

            

    
        return new Ship(
            newPosition.getX(),
            newPosition.getY(),
            newVelocity.getLength(),
            newVelocity.getAngle(),
            this._width,
            this._height,
            this._xScale,
            this._yScale,
            this._rotation
        )

    }

    /*
     * 
     */
    getRotation = () => {
        return this._rotation;
    }

    getVector = () => {
        return this._position;
    }

    setRotation = (angle) => {

        return new Ship(
            this._position.getX(),
            this._position.getY(),
            this._velocity.getLength(),
            this._velocity.getAngle(),
            this._width,
            this._height,
            this._xScale,
            this._yScale,
            this._rotation + angle
        )     

    }

}

class CelestialBody {

    constructor(x,y, speed, direction, radius, name, mass = 1, color) {

        this._position = new Vector(x,y)

        /*
         * redux:in vuoksi muutokset toteutetaan uuden aina objektin avulla
         */
        this._velocity = new Vector(0,0)
            .setLength(speed)
            .setAngle(direction);

        this._radius = radius;

        this._name = name;

        this._mass = mass;

        this._color = color;

    }

    /*
     * Laskee tämän ja parametrin välittämän taivaankappaleen välisen kulman
     */
    angleTo = (p2) => {

        let deltaY = p2._position.getY() - this._position.getY();
        let deltaX = p2._position.getX() - this._position.getX();

        return Math.atan2(deltaY, deltaX)
        
    }

    /*
     * Laskee tämän ja parametrin välittämän taivaankappaeen välisen etäisyyden
     */
    distanceTo = (p2) => {


        let deltaY = p2._position.getY() - this._position.getY();
        let deltaX = p2._position.getX() - this._position.getX();  
        
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    }

    /*
     * Laskee parametrin välittämän taivaankappaleen vetovoiman tämän planeettan 
     * liikerataan aiheuttama muutos.
     */
    gravitateTo = (p2) => {


        /*
         * Lasketaan ensin vektori, joka kertoo "vetävän" kappaleen
         * aiheuttaman voiman
         */
        let grav = new Vector(0,0);
        let distance = this.distanceTo(p2);

        grav = grav.setLength(p2.getMass() / (distance * distance))
        grav = grav.setAngle(this.angleTo(p2))

        /*
         * Em. vetovoiman vaikutus kappaleen liikerataan
         */
        return this._velocity.add(grav)

    }

    getColor = () => {
        return this._color;
    }

    getMass = () => {
        return this._mass;
    }

    getName = () => {
        return this._name;
    }

    getRadius = () => {
        return this._radius;
    }

    getVector = () => {
        return this._position;
    }


    /*
     * x,y, speed, direction, radius, name, mass = 1
     */
    update = (vec) => {



        // lasketaan parametrin välittämän kappaleen vaikutus liikerataan
        let newVelocity = this.gravitateTo(vec)
        let newPosition = this._position.add(this._velocity)


        return new CelestialBody(
            newPosition.getX(),
            newPosition.getY(),
            newVelocity.getLength(),
            newVelocity.getAngle(),
            this._radius,
            this._name,
            this._mass,
            this._color
        )

    }

}

export {
    Partile,
    CelestialBody,
    Ship,
    Vector
};
