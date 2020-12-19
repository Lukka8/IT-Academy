function GreaterNum(Num1, Num2)
{
    if (Num1 < Num2)
    {
        return Num1 + " naklebia " + Num2 + "ze"
    }
    else if (Num1 == Num2)
    {
        return Num1 + " Udris " + Num2 + "s"
    }
    else
    {
        return Num1 + " Metia " + Num2 + "ze"
    }
}

console.log(GreaterNum(10, 15))

function Languages(Lang)
{
    if (Lang == "ka")
    {
        return "გამარჯობა, სამყარო"
    } 
    else if (Lang == "uk")
    {
        return "Hello, World"
    }

    return "Hello, World"
}

console.log(Languages("ka"))

const Grades = {
    [10]: "A+",
    [9]: "A-",
    [8]: "B+",
    [7]: "B-",
    [6]: "C",
    [5]: "D",
    [4]: "E",
    [3]: "F",
    [2]: "G",
    [1]: "H",
    [0]: "I",
}


function Grade(Num)
{
    return Grades[Num]
}

console.log(Grades[10])