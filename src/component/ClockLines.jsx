


const ClockLines = ({line, colors12}) => {

    const centerX = 125;
    const centerY = 125;
    const radius = 110;
    const lineCounts = line;

    const lines = Array.from({length:  lineCounts},(_, i) => {
        const angle = ((i * (360 / lineCounts)) -90) * (Math.PI / 180);
 
        // Calculate the endpoint coordinates
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Return the line path element
        return (
            <circle 
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={colors12[i]}
            />
        );
    })
  

    return (
        <svg className="clock_wrap_circle" viewBox="0 0 250 250" width="250" height="250">
            <circle cx="125" cy="125" r="125" fill="white" />
            {lines}
        </svg>
    )

}

export default ClockLines;