#include "main.h"

/**
 * binary_to_uint - convert binary to number
 * @b: binary
 *
 * Return unsigned int
*/

unsigned int binary_to_uint(const char *b)
{
int i;
unsigned int nuber = 0;

if (!b)
return (0);

for (i = 0; b[i]; i++)
{
if (b[i] < '0' || b[i] > '1')
return (0);
nuber = 2 * nuber + (b[i] - '0');
}

return (nuber);
}
