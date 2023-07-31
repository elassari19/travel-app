#include "main.h"

/**
 * flip_bits - flip bits
 * @n: number
 * @m: number
 * Return: number
 */

unsigned int flip_bits(unsigned long int n, unsigned long int m)
{
unsigned long int current;
unsigned long int exclusive = n ^ m;

int i, counter = 0;
for (i = 63; i >= 0; i--)
{
current = exclusive >> i;
if (current & 1)
counter++;
}

return (counter);
}
