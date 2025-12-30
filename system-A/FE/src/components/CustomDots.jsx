export const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#2E7D32"
      stroke="#fff"
      strokeWidth={2}
    />
  );
};
