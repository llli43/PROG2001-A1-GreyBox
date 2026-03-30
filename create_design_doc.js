const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// 定义边框样式
const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const borders = { top: border, bottom: border, left: border, right: border };

// 创建表格单元格的辅助函数
function createCell(text, width, isHeader = false) {
    return new TableCell({
        borders,
        width: { size: width, type: WidthType.DXA },
        shading: isHeader ? { fill: "D9E2F3", type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ 
            children: [new TextRun({ text: text, bold: isHeader })] 
        })]
    });
}

const doc = new Document({
    styles: {
        default: { 
            document: { 
                run: { font: "Arial", size: 24 } 
            } 
        },
        paragraphStyles: [
            { 
                id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 32, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } 
            },
            { 
                id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
                paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } 
            },
            { 
                id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
                run: { size: 26, bold: true, font: "Arial" },
                paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 2 } 
            }
        ]
    },
    numbering: {
        config: [
            { 
                reference: "bullets",
                levels: [
                    { 
                        level: 0, 
                        format: LevelFormat.BULLET, 
                        text: "•", 
                        alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 720, hanging: 360 } } } 
                    }
                ] 
            }
        ]
    },
    sections: [{
        properties: {
            page: {
                size: { width: 12240, height: 15840 },
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
        },
        children: [
            // 标题页
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 2400, after: 400 },
                children: [new TextRun({ text: "PROG2001 Assessment 1", size: 48, bold: true, color: "2E75B6" })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
                children: [new TextRun({ text: "Grey Box Project Documentation", size: 36, bold: true })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 400, after: 100 },
                children: [new TextRun({ text: "Student: Dongxu Li", size: 28 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 100 },
                children: [new TextRun({ text: "Unit: Developing the User Experience", size: 28 })]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 2400 },
                children: [new TextRun({ text: "Date: March 2026", size: 28 })]
            }),

            // 分页
            new Paragraph({ children: [new PageBreak()] }),

            // 1. 设计规范
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Design Specifications")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.1 Project Overview")] }),
            new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun("This grey box prototype is a 3D exploration game demo featuring a simple interactive environment. The player can navigate through a scene, interact with objects, and experience basic gameplay mechanics. The project demonstrates core UX principles including clear navigation, visual feedback, and intuitive controls.")]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.2 Core Features")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("First-person player movement with mouse look")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Interactive objects that respond to player input")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Scene navigation system (Menu ↔ Game)")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Visual feedback for interactions")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun("Clean and intuitive UI design")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1.3 Technical Specifications")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [3120, 6240],
                rows: [
                    new TableRow({ children: [createCell("Specification", 3120, true), createCell("Details", 6240, true)] }),
                    new TableRow({ children: [createCell("Engine", 3120), createCell("Unity 2022.3 LTS", 6240)] }),
                    new TableRow({ children: [createCell("Platform", 3120), createCell("WebGL (itch.io)", 6240)] }),
                    new TableRow({ children: [createCell("Input", 3120), createCell("Keyboard (WASD) + Mouse", 6240)] }),
                    new TableRow({ children: [createCell("Graphics", 3120), createCell("3D with Basic Shapes & ProBuilder", 6240)] }),
                    new TableRow({ children: [createCell("Scenes", 3120), createCell("MenuScene, GameScene", 6240)] })
                ]
            }),

            new Paragraph({ children: [new PageBreak()] }),

            // 2. 故事板 - 菜单
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Storyboards")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Menu Scene Storyboard")] }),
            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Frame 1: Title Screen")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("Dark grey background (#2D2D2D) with game title prominently displayed in center", 7020)] }),
                    new TableRow({ children: [createCell("UI Elements", 2340), createCell("Title text 'EXPLORATION GAME', three buttons: START GAME, INSTRUCTIONS, QUIT", 7020)] }),
                    new TableRow({ children: [createCell("Interaction", 2340), createCell("Buttons highlight on hover with lighter grey (#4A4A4A), click sound feedback", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Provide clear entry points and set the mood with dark, professional theme", 7020)] })
                ]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Frame 2: Instructions Screen")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("Semi-transparent overlay panel displaying control instructions", 7020)] }),
                    new TableRow({ children: [createCell("UI Elements", 2340), createCell("Control list (WASD = Move, Mouse = Look, E = Interact), BACK button", 7020)] }),
                    new TableRow({ children: [createCell("Interaction", 2340), createCell("BACK button returns to title screen", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Educate player on controls before entering game", 7020)] })
                ]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Frame 3: Transition to Game")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("Fade to black transition", 7020)] }),
                    new TableRow({ children: [createCell("Audio", 2340), createCell("Optional transition sound effect", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Smooth transition between menu and game scenes", 7020)] })
                ]
            }),

            new Paragraph({ children: [new PageBreak()] }),

            // 3. 故事板 - 游戏场景
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Game Scene Storyboard")] }),
            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Frame 1: Initial Spawn")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("First-person view in a simple 3D room with grey box geometry", 7020)] }),
                    new TableRow({ children: [createCell("Environment", 2340), createCell("Floor (grey plane), walls (grey cubes), interactive objects (colored shapes)", 7020)] }),
                    new TableRow({ children: [createCell("UI Elements", 2340), createCell("Crosshair in center, minimal HUD", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Introduce player to the game environment", 7020)] })
                ]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Frame 2: Object Interaction")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("Player approaches an interactive object (colored cube/sphere)", 7020)] }),
                    new TableRow({ children: [createCell("Feedback", 2340), createCell("Object highlights in yellow when looked at, 'Press E to Interact' text appears", 7020)] }),
                    new TableRow({ children: [createCell("Interaction", 2340), createCell("Pressing E changes object color and triggers response", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Demonstrate interactive mechanics and provide clear feedback", 7020)] })
                ]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun("Frame 3: Exploration")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 7020],
                rows: [
                    new TableRow({ children: [createCell("Element", 2340, true), createCell("Description", 7020, true)] }),
                    new TableRow({ children: [createCell("Visual", 2340), createCell("Player freely moves around the environment using WASD controls", 7020)] }),
                    new TableRow({ children: [createCell("Environment", 2340), createCell("Multiple interactive objects placed at different locations", 7020)] }),
                    new TableRow({ children: [createCell("Navigation", 2340), createCell("ESC key opens pause menu with RETURN TO MENU option", 7020)] }),
                    new TableRow({ children: [createCell("Purpose", 2340), createCell("Allow free exploration and provide exit path", 7020)] })
                ]
            }),

            new Paragraph({ children: [new PageBreak()] }),

            // 4. 情绪板
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Mood Board")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Visual Style")] }),
            new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Grey Box Aesthetic: ", bold: true }), new TextRun("Simple geometric shapes with flat colors, focusing on form and function over detailed textures.")] }),
            new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "Color Palette: ", bold: true }), new TextRun("Neutral greys for environment (#808080, #A0A0A0), accent colors for interactive elements (#FF6B6B, #4ECDC4, #45B7D1).")] }),
            new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Lighting: ", bold: true }), new TextRun("Soft, even lighting with clear shadows to emphasize 3D forms and spatial relationships.")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 User Experience Goals")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [3120, 6240],
                rows: [
                    new TableRow({ children: [createCell("Goal", 3120, true), createCell("Implementation", 6240, true)] }),
                    new TableRow({ children: [createCell("Clarity", 3120), createCell("Clear visual hierarchy, obvious interactive elements, simple UI", 6240)] }),
                    new TableRow({ children: [createCell("Feedback", 3120), createCell("Immediate visual response to player actions (highlights, color changes)", 6240)] }),
                    new TableRow({ children: [createCell("Control", 3120), createCell("Responsive, standard FPS controls that feel natural", 6240)] }),
                    new TableRow({ children: [createCell("Accessibility", 3120), createCell("Large buttons, high contrast text, clear instructions", 6240)] })
                ]
            }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("3.3 Atmosphere")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Professional and clean interface design")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Focused on functionality and usability")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Minimal distractions, emphasis on core interactions")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun("Modern, sleek aesthetic appropriate for a prototype demo")] }),

            new Paragraph({ children: [new PageBreak()] }),

            // 5. 链接
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Project Links")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 itch.io Project")] }),
            new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Project URL: "), new TextRun({ text: "[Your itch.io URL will be added after uploading]", italics: true })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 GitHub Repository")] }),
            new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Repository URL: "), new TextRun({ text: "[Your GitHub URL will be added after creating repository]", italics: true })] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 How to Play")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Visit the itch.io link above")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Click 'Run Game' to start the WebGL build")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Click START GAME from the menu")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Use WASD to move, Mouse to look around")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Press E when near interactive objects")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Press ESC to unlock mouse, access menu")] }),

            new Paragraph({ children: [new PageBreak()] }),

            // 6. 团队协作证据
            new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Team Collaboration Evidence")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5.1 Discussion Summary")] }),
            new Paragraph({ spacing: { after: 100 }, children: [new TextRun("As part of the team collaboration for this assessment, the following discussions were held regarding the shared menu design and overall project theme:")] }),
            
            new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Discussion Points:")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Menu Design: ", bold: true }), new TextRun("Agreed on a clean, dark-themed menu with clear navigation buttons (Start, Instructions, Quit)")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Navigation: ", bold: true }), new TextRun("Standardized on simple scene transitions with fade effects")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Theme: ", bold: true }), new TextRun("Consistent grey box aesthetic across all team members' scenes")] }),
            new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "UX Principles: ", bold: true }), new TextRun("Emphasized clear feedback, intuitive controls, and accessibility")] }),

            new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 200 }, children: [new TextRun("5.2 Communication Log")] }),
            new Table({
                width: { size: 9360, type: WidthType.DXA },
                columnWidths: [2340, 3120, 3900],
                rows: [
                    new TableRow({ children: [createCell("Date", 2340, true), createCell("Topic", 3120, true), createCell("Outcome", 3900, true)] }),
                    new TableRow({ children: [createCell("Week 2", 2340), createCell("Initial concept discussion", 3120), createCell("Agreed on grey box approach and individual scenes", 3900)] }),
                    new TableRow({ children: [createCell("Week 3", 2340), createCell("Menu design collaboration", 3120), createCell("Dark theme, three-button layout decided", 3900)] }),
                    new TableRow({ children: [createCell("Week 3", 2340), createCell("Navigation flow review", 3120), createCell("Standardized scene transition approach", 3900)] }),
                    new TableRow({ children: [createCell("Week 4", 2340), createCell("Final review", 3120), createCell("Feedback and polish suggestions", 3900)] })
                ]
            })
        ]
    }]
});

// 生成文档
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("c:\\Users\\32447\\Desktop\\PROG2001_A1_Dongxu Li\\Design_Documentation.docx", buffer);
    console.log("Design documentation created successfully!");
}).catch(err => {
    console.error("Error creating document:", err);
});
