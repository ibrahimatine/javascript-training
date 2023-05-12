package main

import (
	//"image/color"

	"github.com/fatih/color"
	"github.com/ibrahimatine/lucky-number/internal/random"
)

func main() {
	//get a random number between 0 and 99 inclusive.

	//print it out. (imprimer le !)
	green := color.New(color.FgGreen)
	green.Printf("your lucky number is %d\n", random.Number())
}
