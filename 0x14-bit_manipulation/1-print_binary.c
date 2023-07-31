#include "main.h"

/**
 * print_binary - prints number
 *
 * @n: number
 */

void print_binary(unsigned long int n)
{
int i, counter = 0;
unsigned long int select;

for (i = 63; i >= 0; i--)
{
select = i >> i;

if (select & 1)
{
_putchar('1');
counter++;
}
else if (counter)
_putchar('0');
}
if (!counter)
_putchar('0');
}
