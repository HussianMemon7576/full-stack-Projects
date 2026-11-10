
export function generateAvatar(fullName: string) {
  if (!fullName) return null;

  const randomColors = [
    "#F87171",
    "#FB923C",
    "#FACC15",
    "#4ADE80",
    "#2DD4BF",
    "#60A5FA",
    "#818CF8",
    "#C084FC",
    "#F472B6",
  ];


  const name = fullName.trim().charAt(0).toUpperCase();

  const randomColor =  randomColors[Math.floor(Math.random() * randomColors.length)];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <rect width="100%" height="100%" fill="${randomColor}" />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        font-size="100"
        font-family="Arial"
        fill="#ffffff"
      >
        ${name}
      </text>
    </svg>
  `;

  return svg
}
