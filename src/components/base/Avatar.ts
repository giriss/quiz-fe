import styled from "styled-components"

const Avatar = styled.div<{ $src?: string; $size?: string }>`
  width: ${({ $size }) => $size ?? "150px"};
  height: ${({ $size }) => $size ?? "150px"};
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $src }) => ($src ? $src : "unset")});
`

Avatar.displayName = "Avatar"

export default Avatar
