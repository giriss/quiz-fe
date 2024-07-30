import styled from "styled-components"

const Avatar = styled.div<{ $src?: string; $size?: number }>`
  width: ${({ $size }) => $size ?? 150}px;
  height: ${({ $size }) => $size ?? 150}px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $src }) => ($src ? $src : "unset")});
`

Avatar.displayName = "Avatar"

export default Avatar
