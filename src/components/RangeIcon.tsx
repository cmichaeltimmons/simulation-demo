import SvgIcon from "@mui/material/SvgIcon";

type Props = {
  fill: string;
};
/**
 * Currently not using this component.
 */
export const RangeIcon = (props: Props) => {
  return (
    <SvgIcon>
      <svg
        className="MuiSvgIcon-root"
        viewBox="0 0 200 200"
        width="40px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={props.fill}
          d="M56.7,-21.5C60.7,-6,42.4,13.6,23.9,25.3C5.3,37,-13.6,40.9,-26.7,32.4C-39.8,23.9,-47.1,3.1,-41.7,-14.3C-36.3,-31.6,-18.2,-45.6,4.1,-46.9C26.3,-48.3,52.7,-37,56.7,-21.5Z"
          transform="translate(100 100)"
        />
      </svg>
    </SvgIcon>
  );
};
