import { compose } from "redux";

const P0 = {"x":50, "y":135};
const P1 = {"x":450,"y":135};
const P2 = {"x":250,"y":481};

const K0 =  {"x":250, "y":450};
const K1 =  {"x":250, "y":50};

const PYTH1 = {"x":250, "y":450};

/*
 */
const PATTERN = {
    SIERPINSKI :{
        name: 'Sierpinski',
        value: 'sierpinski',
        description: 'Sierpinski triangle',
        lineType: 'polygon',
        settings: {
            numberOfIterations: {
                min: 0,
                value: 3,
                max: 6,
                tool: "NumberInput",
                step: null,
                name: "Number of iterations"
            }            
        },
        setup: function(s) {
            return getSierpinskiData(s)
        }
    },
    KOCH: {
        name: 'Koch',
        value: 'koch',
        description: 'Koch snowflake',
        lineType: 'polygon',
        settings: {
            numberOfIterations: {
                min: 0,
                value: 2,
                max: 8,
                tool: "NumberInput",
                step: null,
                name: "Number of iterations"
            }            
        },
        setup: function(s) {
            return getKochData(s)
        }
    },
    TREE: {
        name: 'Fractal Tree',
        value: 'tree',
        description: 'Fractal tree',
        lineType: 'path',
        settings: {
            branchAngleA: {
                min: -Math.PI / 2,
                value: -1*Math.PI/4,
                max: Math.PI / 2,
                tool: "Slider",
                step: 0.1,
                name: "Branch Angle A"
            },
            branchAngleB: {
                min: -Math.PI / 2,
                value: 1*Math.PI/3,
                max: Math.PI / 2,
                tool: "Slider",
                step: 0.1,
                name: "Branch Angle B"
            },
            numberOfIterations: {
                min: 0,
                value: 4,
                max: 8,
                tool: "NumberInput",
                step: null,
                name: "Number of iterations"
            },
            trunkRatio: {
                min: 0.1,
                value: 0.5,
                max: 0.9,
                tool: "Slider",
                step: 0.1,
                name: "Trunk ratio"
            },         
        },
        setup: function(s) {
            return getTreeData(s)
        }
    }, 
    PYTHAGOREAN: {
        name: 'Pythagorean Tree',
        value: 'Pythagorean',
        description: 'Pythagorean Fractal tree',
        lineType: 'path',
        settings: {
            alpha: {
                min: -1 * Math.PI,
                value: -1*Math.PI/6,
                max: 1 * Math.PI,
                tool: "Slider",
                step: 0.1,
                name: "Alpha"
            },
            beta: {
                min: 0,
                value: Math.PI/2.9,
                max: Math.PI/2,
                tool: "Slider",
                step: 0.1,
                name: "Beta"
            },
            numberOfIterations: {
                min: 0,
                value: 3,
                max: 8,
                tool: "NumberInput",
                step: null,
                name: "Number of iterations"
            },
            size: {
                min: 10,
                value: 60,
                max: 200,
                tool: "NumberInput",
                step: null,
                name: "Size"
            }
        },
        setup: function(s) {
            return getPythagoreanData(s)
        }
    }
}/*
 * Alustetaan aineisto valitun animaation mukaisilla partikkeleilla
 *
 * @param aType minkä tyyppinen animaatio halutaan esittää
 * @param n montako partikkelia alustetaan
 */
const getData = (aType) => aType.setup(aType.settings);

const getInitialAnimationType = () => PATTERN.PYTHAGOREAN;

const getInitialNumberOfIterations = () => 1

/*
 * Muodostetaan pisteistä tulostettava objekti
 */
const getTriangle = (p0, p1, p2, layer) => {

    return {
        points: [{x: p0.x, y: p0.y}, {x: p1.x, y: p1.y}, {x: p2.x, y: p2.y}],
        className: layer === 1 ? `triangle last_iteration` : `triangle`
    }
}

const drawRectangle = (corner, size) => {

    let points = [];

    points.push({x: corner.x,y: corner.y});    
    points.push({x: corner.x + size,y: corner.y});
    points.push({x: corner.x + size,y: corner.y - size});
    points.push({x: corner.x,y: corner.y - size});

    return points;

}

const drawRectangleL = (corner, size) => {

    let points = [];

    points.push({x: corner.x,y: corner.y});    
    points.push({x: corner.x - size,y: corner.y});
    points.push({x: corner.x - size,y: corner.y - size});
    points.push({x: corner.x,y: corner.y - size});

    return points;

}

/*
 * Laskettavan kolmion hypotenuusan päätepisteet tiedetään jo. 
 * Em. iso kolmio voidaan jakaa kahteen pienee suorakulmaiseen kolmioon,
 * joiden hypotenuusat "ison kolmio" kannat muodostavat.
 * 
 * @param beta laskettavan kolmio pistettä a vastaava kulma
 * @param a kolmion hypotenuustan kärkipiste, johon laskenta ja piirto perustuu
 * @param b kolmion hypotenuusan päätepiste, käytetään sellaisenaan..
 * @param alpha hypotenuusan kulma suhteessa x-akseliin
 */
const drawTriangle = (beta, a, b) => {

//console.log("corner", a.x, a.y)

    let dx = b.x - a.x;
    let dy = b.y - a.y;

    // Kuinka paljon kanta on kääntynyt origon suhteen
    let theta = Math.atan2(dy, dx)
//console.log(dx, dy, theta, (theta * 180 / Math.PI))

    let size = Math.sqrt(dx*dx + dy*dy);
//console.log("si", size)

    // - lasketaan beta -kulmaa vastaavan kolmion hypotenuusa
    let hDot = size * Math.cos(beta)
//console.log("hDot", hDot)

    // - lasketaan beta-kulmaa vastaavan pikkukolmion kateettien pituudet
    let xDot = hDot * Math.cos(beta)
    let yDot = hDot * Math.sin(beta)

//console.log("xDot, yDot", xDot, yDot)

    // - kääntöä edeltävät x ja y -koordinaatit
    let cDotX =  a.x + xDot;
    let cDotY =  a.y + yDot;

//console.log("cDotX, cDotY", cDotX, cDotY)


    let rotated = rotateClockwise({
        x: cDotX,
        y: cDotY
    }, a, theta);

//console.log("rotated", rotated)

    return [
        a,
        b,
        rotated
    ]
    
}

/*
 * Fraktaali Pythagoraan puu
 */ 
const getPythagoreanData = (settings) => {

    let squares = [];

    let size = settings.size.value;
    let alpha = settings.alpha.value;
    let beta = -1*settings.beta.value;

    let depth = settings.numberOfIterations.value

    let points = drawRectangle(PYTH1, size)
    points = rotate(alpha, points)
    squares.push(points)
//
    let triAnglePoints = drawTriangle(beta, points[3], points[2])

    if(depth > 0) {
        leftBranch(triAnglePoints, squares, beta, depth)
        rightBranch(triAnglePoints, squares, beta, depth)
    }

    return squares
    
}


const getAngleAndLength = (a, b) => {

    let dy = b.y - a.y;
    let dx = b.x - a.x;

    //console.log("x a -> b", dx)
    //console.log("y a -> b", dy)
    //console.log("angle a -> b", Math.atan2(dy,dx) * 360 / (2 * Math.PI))

    return {
        angle: Math.atan2(dy,dx),
        length: Math.sqrt(dy*dy + dx*dx)
    }
}

/* 
 * Lasketaan parametrin välittämää syvyttä vastaavan Sierpinskin kolmion pisteet
 */
const getSierpinskiData = (settings) => {

    let triangles = [];

    // Pohjalle tuleva kolmio
    triangles.push(getTriangle(P0, P1, P2, 0));

    // Mahdolliset sisäkkäiset kolmiot
    sierpinski(triangles, P0, P1, P2, settings.numberOfIterations.value);

    return triangles
}

/*
 *
 */ 
const getTreeData = (settings) => {

    let points = [];

    tree(
        points, 
        K0, 
        K1, 
        settings.numberOfIterations.value, 
        settings.trunkRatio.value, 
        settings.branchAngleA.value, 
        settings.branchAngleB.value
    )

    return points;
}

/*
 * Mikäli syvyys on 0, tulostetaan lähtötilanne, eli peruskolmio
 */
const getKochData = (settings) => {

    let polylines = [];

    let depth = settings.numberOfIterations.value

    if(depth === 0) {
        // Pohjalle tuleva kolmio
        polylines.push(getTriangle(P0, P1, P2, 0));    
        return polylines
    } else {
        koch(polylines, P0, P1, depth);
        koch(polylines, P1, P2, depth);
        koch(polylines, P2, P0, depth);
    }

    return [{points: polylines, className: "koch"}]
}



const koch = (polylines, p0, p1, limit) => {

    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    let unit = dist / 3;

    // Angle between points p1 and p0
    let angle = Math.atan2(dy, dx);

    let pA = {
        x: p0.x + dx / 3,
        y: p0.y + dy / 3
    }

    let pC = {
        x: p1.x - dx / 3,
        y: p1.y - dy / 3
    }

    let pB = {
        x: pA.x + Math.cos(angle - Math.PI / 3) * unit,
        y: pA.y + Math.sin(angle - Math.PI / 3) * unit
    }

    if(limit > 1){
        koch(polylines, p0, pA, limit-1);
        koch(polylines, pA, pB, limit-1);
        koch(polylines, pB, pC, limit-1);
        koch(polylines, pC, p1, limit-1)
    } else {

        if(polylines.length === 0)
            polylines.push({x: p0.x, y: p0.y})

        polylines.push({x: p0.x, y: p0.y})
        polylines.push({x: pA.x, y: pA.y})
        polylines.push({x: pB.x, y: pB.y})
        polylines.push({x: pC.x, y: pC.y})
        polylines.push({x: p1.x, y: p1.y})
    }

}


const leftBranch = (triAnglePoints, arr, beta, depth) => {

    depth = depth - 1

    let aEtL = getAngleAndLength(triAnglePoints[0], triAnglePoints[2])

    let points2 = drawRectangle(triAnglePoints[0], aEtL.length)
    points2 = rotate(aEtL.angle, points2)

    arr.push(points2)

    if(depth > 0) {
        let triAnglePointsL = drawTriangle(beta, points2[3], points2[2])
        leftBranch(triAnglePointsL, arr, beta, depth)

        rightBranch(triAnglePointsL, arr, beta, depth)
        
    }

}

/*
 * Lasketaan minimi ja maksimiarvon välille osuva satunnaisluku
 */
const randomRange = (min, max) => {
    return min + Math.random() * (max - min)
}

const rightBranch = (triAnglePoints, arr, beta, depth) => {

    depth = depth - 1

    let aEtL2 = getAngleAndLength(triAnglePoints[1], triAnglePoints[2])

    let points3 = drawRectangle(triAnglePoints[2], aEtL2.length)
    points3 = rotate((Math.PI + aEtL2.angle), points3)
    arr.push(points3)
    

    if(depth > 0) {
        let triAnglePointsR = drawTriangle((beta), points3[3], points3[2])
        rightBranch(triAnglePointsR, arr, beta, depth)

        leftBranch(triAnglePointsR, arr, beta, depth)
    }

}


/*
 * Käännetään objektia
 * - kääntö objektin ensimmäisen pisteen suhteen
 *
 * param @item käännettävä objekti
 */
const rotate = (angle, item) => {


    let rotatedItem = item.map((d) => {

        let rotatedPoint = rotateClockwise(d, item[0], angle);

        return {
            x: rotatedPoint.x,
            y: rotatedPoint.y
        };
    })

    return rotatedItem

}


/*
 * 
 */
let rotateClockwise = (point, pivotPoint, angle) => {

    // Siirto origoon
    let x = point.x - pivotPoint.x;
    let y = point.y - pivotPoint.y;

    // Kääntö ja palautus origon suhteen
    let transX = (x * Math.cos(angle) - y * Math.sin(angle)) + pivotPoint.x;
    let transY = (x * Math.sin(angle) + y * Math.cos(angle)) + pivotPoint.y;

    return {
        x: transX,
        y: transY
    }

}

/* 
 *  Päivitetään fraktaalin piirtämisessä käytettävää muuttujaa
 */
const setParameterValue = (state, data) => {

    let newSettings = updateSetting(data.param, data.value, state.animation.settings)

    // - päivitetään aktiivisen animaation ominaisuudet
    let actAnimation = {
        ...state.animation,
        settings: newSettings
    }

    // - päivitetään myös valittavana olevat vaihtoehdot sisältävä
    let newAnimationTypes = updateAnimationTypes(actAnimation, state.animationTypes);

    // - päivittään fraktaali 
    let newData = getData(actAnimation);

    return {
        ...state,
        animation: actAnimation,
        animationTypes: newAnimationTypes,
        data: newData,
    }

}

/*
 * Sierpinskin kolmion pisteiden laskenta.
 * - jaetaan parametrien välittämien pisteiden p0, p1 ja p2 muodostama kolmio
 *   kolmeen sisäkkäiseen kolmioon. 
 * - sisäkkäiset kolmiot muodostetaan puolittmalla alkuperäisen kolmion kateetit
 */
const sierpinski = (triangles, p0, p1, p2, limit) => {

    if(limit >= 1) {

        /*
         * Lasketaan kateettien keskipisteet
         */

        let pA = {
            x: (p0.x + p1.x) / 2,
            y: (p0.y + p1.y) / 2,
        },
        pB = {
            x: (p1.x + p2.x) / 2,
            y: (p1.y + p2.y) / 2,
        },
        pC = {
            x: (p2.x + p0.x) / 2,
            y: (p2.y + p0.y) / 2,
        }
    
        /*
         * Muodosteteaan pikkukolmiot
         */
        triangles.push(getTriangle(p0, pA, pC, limit));
        triangles.push(getTriangle(pA, p1, pB, limit));
        triangles.push(getTriangle(pC, pB, p2, limit));


        /*
         * Seuraavan tason laskenta
         */
        sierpinski(triangles, p0, pA, pC, limit - 1);
        sierpinski(triangles, pA, p1, pB, limit - 1);
        sierpinski(triangles, pC, pB, p2, limit - 1);

    }

}

const tree = (points, p0, p1, limit, trunkRatio, branchAngleA, branchAngleB) => {

    let dx = p1.x - p0.x;
    let dy = p1.y - p0.y;

    let dist = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);

    let branchLength = dist * (1 - trunkRatio)

    let pA = {
        x: p0.x + dx * trunkRatio,
        y: p0.y + dy * trunkRatio
    }

    let pB = {
        x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
        y: pA.y + Math.sin(angle + branchAngleA) * branchLength
    }

    let pC = {
        x: pA.x + Math.cos(angle - branchAngleB) * branchLength,
        y: pA.y + Math.sin(angle - branchAngleB) * branchLength
    }

    /* - väli juuresta haarautumispisteeseen */
    points.push([{x: p0.x, y: p0.y},{x: pA.x, y: pA.y}]) 

    /* 
     * joko lähdetään laskemaan uutta oksaa
     * tai tai piirretään oksan muodostavat kolme pistettä
     */
    if(limit > 0) {
        let updatedAngleA = branchAngleA + randomRange(-0.1,0.1)
        let updatedAngleB = branchAngleB + randomRange(-0.1,0.1)

        tree(points, pA, pC, limit-1, trunkRatio, updatedAngleA, updatedAngleB)
        tree(points, pA, pB, limit-1, trunkRatio, updatedAngleA, updatedAngleB)
    } else {
        points.push([
            {x: pB.x, y: pB.y},
            {x: pA.x, y: pA.y},
            {x: pC.x, y: pC.y}
        ])
    }

}


/*
 * Päivitetään käytettävissä olevat fraktaalivaihtoehdot kokoava objekti
 */
const updateAnimationTypes = (active, patterns) => {
    
    // - haetaan avain, jonka fraktaalin ominaisuudet on piilotettu 
    let key = Object.entries(patterns)
        .filter(([k, props]) => {


            return props.value === active.value
        })[0][0];

    return {
        ...patterns,
        [key]: active
    }
        
}


/*
 * Päivitetään tietyn asetuksista löytyvän paremetrin arvoa
 */
const updateSetting = (param, value, settings) => {

    let clone = JSON.parse(JSON.stringify(settings))

    let setting = Object.entries(clone)
        .filter(([key, value]) => {
            return key === param
        })[0];

    let key = setting[0]
    let val = setting[1]
    val.value = value

    return {
        ...clone,
        [key]: val
    }

}


/*
 */
const initialState = {
    animation: getInitialAnimationType(),
    animationTypes: PATTERN,
    data: getData(getInitialAnimationType()),
    iterations: getInitialNumberOfIterations(),
    minNumberOfIterations: 0,
    maxNumberOfIterations: 8,
    height: 400,
    isActive: false,
    width: 600
}

/*
 * I M P L E M E N T I N G   A C T I O N S
 */
/*
 * Asetetaan esitettävän animaation tyyppi
 * - vaihtoehtoina ovat Firework ja Fountain
 */
const changeFractalType = (state, data) => {

    const newActive = Object.entries(state.animationTypes)
        .filter(([key, value]) => {
            return  value.value === data.type;
        })[0][1];

    let newData = getData(newActive)

    return {
        ...state,
        animation: newActive,
        data: newData
    }
}

/*
 * Muutetaan iteraatioden lukumäärä
 *
 * @todo: poista
 */ 
const changeIterationCount = (state, data) => {

    console.log(data)

    let newNOP = data.iterations;
    let newData = getData(state.animation);

    return {
        ...state,
        iterations: newNOP,
        data: newData
    }

}

/*
 * A C T I O N S
 */
export const setFractalType = (val) => {

    return dispatch => {

        dispatch({
            type: 'FRACTAL_SET_FRACTAL_TYPE',
            data: {
                type: val
            }
        })
    }
}

/*
 * Partikkeleille sallitun alueen korkeuden säätö
 */
export const setNumberOfIterations = (val) => {

    return dispatch => {

        dispatch({
            type: 'FRACTAL_SET_ITERATION_COUNT',
            data: {
                iterations: val
            }
        })
    }
}

/*
 * Fraktaalin laskemisessa käytettävän muuttujanarvon päivitys
 */
export const setParameter = (param, val) => {

    return dispatch => {

        dispatch({
            type: 'FRACTAL_SET_PARAMETER',
            data: {
                param: param,
                value: val
            }
        })
    }
}


const fractalReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'FRACTAL_SET_FRACTAL_TYPE':
            return changeFractalType(state, action.data);

        case 'FRACTAL_SET_ITERATION_COUNT':
            return changeIterationCount(state, action.data);

        case 'FRACTAL_SET_PARAMETER':
            return setParameterValue(state, action.data);
            
        default:
            return state;
    }
}

export default fractalReducer;
