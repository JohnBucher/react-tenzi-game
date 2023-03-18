import './Die.css';
import { sides } from '../../data/die-faces';

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    function generateDieFace() {
        // Grab needed mapping based on the incoming value
        const side_map = sides[`side_${props.value}`];

        // Iterate over every row, and every die-space to generate dots if they exist
        let rowNum = 0;
        return side_map.map(row => {
            rowNum++
            return (
                <div className='die-row' key={`${rowNum}`}>
                    { generateDieRow(row) }
                </div>
            )
        })
    }

    function generateDieRow(row) {
        let col = 0;
        return row.map(space => {
            col++;
            return (<div className={space ? "die-dot" : "die-blank"} key={`${col}`}></div>)
        });
    }

    return (
        <div className="die-block" style={styles} onClick={props.hold}>
            <div> {generateDieFace()} </div>
        </div>
    );
}