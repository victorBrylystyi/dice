
export default function Guide (props){

    const left = '0';
    const top = '0';
    const margin = 5 + 'px';
    const zIndex = '999';

    return (
        <div id='guide' style={{margin,left,top,zIndex,position:'absolute'}}> 
            <p style={{color: props.color}}>R - Reset position</p>
            <p style={{color: props.color}}>C - Change color</p>
            <p style={{color: props.color}}>I - Toss the dices</p>
        </div>
    );
}
