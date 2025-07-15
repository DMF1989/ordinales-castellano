document.addEventListener('DOMContentLoaded', () => {
            const superscriptMap = {
                '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
                '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
                '-': '⁻'
            };
             
            // Función para convertir etiquetas <sup> en HTML
            function convertSupTags(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                doc.querySelectorAll('sup').forEach(sup => {
                    const converted = sup.textContent
                        .split('')
                        .map(char => superscriptMap[char] || char)
                        .join('');
                    
                    const textNode = document.createTextNode(converted);
                    sup.replaceWith(textNode);
                });
                
                return doc.body.innerHTML;
            }
            
            // Función para convertir texto plano con patrones <sup>
            function convertPlainText(text) {
                return text.replace(/<sup>([^<]+)<\/sup>/gi, (match, content) => {
                    return content.split('').map(char => superscriptMap[char] || char).join('');
                });
            }
            
            // Función para extraer texto de HTML
            function extractTextFromHTML(html) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                return tempDiv.textContent || tempDiv.innerText;
            }
            
            // Manejador de eventos de pegado
            function handlePaste(e) {
                const clipboardData = e.clipboardData || window.clipboardData;
                if (!clipboardData) return;
                
                // Obtener contenido HTML y texto plano
                const html = clipboardData.getData('text/html');
                let text = clipboardData.getData('text/plain');
                
                // Prevenir el comportamiento por defecto
                e.preventDefault();
                
                // Procesar según el tipo de contenido
                if (html) {
                    // Convertir etiquetas <sup> en el HTML
                    const convertedHTML = convertSupTags(html);
                    // Extraer solo el texto
                    const convertedText = extractTextFromHTML(convertedHTML);
                    
                    // Insertar el texto convertido
                    document.execCommand('insertText', false, convertedText);
                } else if (text) {
                    // Convertir patrones de texto plano
                    const convertedText = convertPlainText(text);
                    document.execCommand('insertText', false, convertedText);
                }
            }
            
            // Agregar eventos a los campos de texto
            enter.addEventListener('paste', handlePaste);
        });