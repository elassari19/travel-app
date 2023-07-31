#include "main.h"

/**
 * append_text_to_file - append text to file
 * @filename: file name
 * @text_content: text content
 *
 * Return: number
 */

int append_text_to_file(const char *filename, char *text_content)
{
int _openFile, _writeFile, length = 0;

if (filename == NULL)
return (-1);

if (text_content != NULL)
{
for (length = 0; text_content[length];)
length++;
}

_openFile = open(filename, O_WRONLY | O_APPEND);
_writeFile = write(_openFile, text_content, length);

if (_openFile == -1 || _writeFile == -1)
return (-1);

close(_openFile);
return (1);
}
