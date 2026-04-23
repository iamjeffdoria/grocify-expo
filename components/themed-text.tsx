import { Text, TextProps } from 'react-native'

interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'subtitle' | 'link'
}

export function ThemedText({ style, type = 'default', ...props }: ThemedTextProps) {
  return (
    <Text
      style={[
        type === 'default' && { fontSize: 16 },
        type === 'title' && { fontSize: 32, fontWeight: 'bold' },
        type === 'subtitle' && { fontSize: 20, fontWeight: 'bold' },
        type === 'link' && { fontSize: 16, color: '#0a7ea4' },
        style,
      ]}
      {...props}
    />
  )
}