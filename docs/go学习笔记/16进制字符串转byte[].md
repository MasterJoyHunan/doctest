### 字符串形式的16进制，每个字符串都转换成 []byte

> 需要注意，如果是需要使用  ` binary.Read()` , 结构体不能含有 `int` 这种含糊不清的类型，因为在不同的平台下 `int` 所占用的字节不同，推荐使用语义更明确的 `int36 | int64` 这种结构

```go
package main

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"strings"
)

type TypeTest struct {
	Ts1 int8
	Ts2 int64
	Ts3 int8
	Ts4 int32
}

var mapping = map[string]uint8{
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"A": 10,
	"B": 11,
	"C": 12,
	"D": 13,
	"E": 14,
	"F": 15,
	"a": 10,
	"b": 11,
	"c": 12,
	"d": 13,
	"e": 14,
	"f": 15,
}

var reMapping = [16]string{"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"}

// 特定字符串转字节数组
func StrHexToByte(str string) []byte {
	if strings.HasPrefix(str, "0x") || strings.HasPrefix(str, "0X") {
		str = str[2:]
	}
	size := len(str)
	res := make([]byte, size)
	for i := 0; i < size; i++ {
		index := str[i : i+1]
		b, ok := mapping[index]
		if !ok {
			panic("非法字符串")
		}
		res[i] = b
	}
	return res
}

// 字节数组转特定字符串
func ByteToStrHex(b []byte, prefix ...string) string {
	var buf strings.Builder
	if len(prefix) > 0 {
		buf.WriteString(prefix[0])
	}
	for i := 0; i < len(b); i++ {
		index := b[i] & 0x0f
		str := reMapping[index]
		buf.WriteString(str)
	}
	return buf.String()
}

func main() {
	str := "0x27feea321093fe1e1e112121eee"
	fmt.Println(str)
	res := StrHexToByte(str)
	fmt.Println(res)

	r := bytes.NewReader(res)

	var t TypeTest
	if err := binary.Read(r, binary.LittleEndian, &t); err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", t)

	bs := new(bytes.Buffer)
	if err := binary.Write(bs, binary.LittleEndian, t); err != nil {
		panic(err)
	}
	fmt.Println("ByteToStrHex:", ByteToStrHex(bs.Bytes(), "0X"))
}
```

