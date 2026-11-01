const BULB_COLORS = ["#e8b84b", "#e05b52", "#57b87e", "#8fcbe8"];

export const LightGarland = ({ bulbs = 26 }: { bulbs?: number }) => (
  <div className="garland" aria-hidden="true">
    {Array.from({ length: bulbs }).map((_, index) => {
      const color = BULB_COLORS[index % BULB_COLORS.length];

      return (
        <span
          key={index}
          className="garland-bulb"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px 2px ${color}80, 0 0 26px 6px ${color}33`,
            animationDelay: `${(index % 7) * 0.37}s`,
            marginTop: `${(index % 3) * 3}px`,
          }}
        />
      );
    })}
  </div>
);
