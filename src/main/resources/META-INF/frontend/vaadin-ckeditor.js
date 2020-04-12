import { LitElement, html, css } from "lit-element";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { ClassicEditor, InlineEditor, BalloonEditor, DcoupledEditor } from "./ckeditor";

class VaadinCKEditor extends LitElement {

    constructor() {
        super();
        this.classes = {
            'editable-container' : true,
            'document-editor__editable'  : true,
            'ck-editor__editable' : true
        };
        this.themeStyles = {
            '--ck-custom-background' : 'hsl(270, 1%, 29%)',
            '--ck-custom-foreground' : 'hsl(255, 3%, 18%)',
            '--ck-custom-border' : 'hsl(300, 1%, 22%)',
            '--ck-custom-white' : 'hsl(0, 0%, 100%)'
        };
    }

    static get styles() { return css`
        :host {
            --ck-highlight-marker-blue: #72cdfd;
            --ck-highlight-marker-green: #63f963;
            --ck-highlight-marker-pink: #fc7999;
            --ck-highlight-marker-yellow: #fdfd77;
            --ck-highlight-pen-green: #118800;
            --ck-highlight-pen-red: #e91313;
            --ck-image-style-spacing: 1.5em;
            --ck-todo-list-checkmark-size: 16px;
            --ck-border-radius: 4px;
            --ck-font-size-base: 14px;
            --ck-custom-background: hsl(270, 1%, 29%);
            --ck-custom-foreground: hsl(255, 3%, 18%);
            --ck-custom-border: hsl(300, 1%, 22%);
            --ck-custom-white: hsl(0, 0%, 100%);
            --ck-color-base-foreground: var(--ck-custom-background);
            --ck-color-focus-border: hsl(208, 90%, 62%);
            --ck-color-text: hsl(0, 0%, 98%);
            --ck-color-shadow-drop: hsla(0, 0%, 0%, 0.2);
            --ck-color-shadow-inner: hsla(0, 0%, 0%, 0.1);
            --ck-color-button-default-background: var(--ck-custom-background);
            --ck-color-button-default-hover-background: hsl(270, 1%, 22%);
            --ck-color-button-default-active-background: hsl(270, 2%, 20%);
            --ck-color-button-default-active-shadow: hsl(270, 2%, 23%);
            --ck-color-button-default-disabled-background: var(--ck-custom-background);
            --ck-color-button-on-background: var(--ck-custom-foreground);
            --ck-color-button-on-hover-background: hsl(255, 4%, 16%);
            --ck-color-button-on-active-background: hsl(255, 4%, 14%);
            --ck-color-button-on-active-shadow: hsl(240, 3%, 19%);
            --ck-color-button-on-disabled-background: var(--ck-custom-foreground);
            --ck-color-button-action-background: hsl(168, 76%, 42%);
            --ck-color-button-action-hover-background: hsl(168, 76%, 38%);
            --ck-color-button-action-active-background: hsl(168, 76%, 36%);
            --ck-color-button-action-active-shadow: hsl(168, 75%, 34%);
            --ck-color-button-action-disabled-background: hsl(168, 76%, 42%);
            --ck-color-button-action-text: var(--ck-custom-white);
            --ck-color-button-save: hsl(120, 100%, 46%);
            --ck-color-button-cancel: hsl(15, 100%, 56%);
            --ck-color-dropdown-panel-background: var(--ck-custom-background);
            --ck-color-dropdown-panel-border: var(--ck-custom-foreground);
            --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
            --ck-color-split-button-hover-border: var(--ck-custom-foreground);
            --ck-color-input-background: var(--ck-custom-foreground);
            --ck-color-input-border: hsl(257, 3%, 43%);
            --ck-color-input-text: hsl(0, 0%, 98%);
            --ck-color-input-disabled-background: hsl(255, 4%, 21%);
            --ck-color-input-disabled-border: hsl(250, 3%, 38%);
            --ck-color-input-disabled-text: hsl(0, 0%, 46%);
            --ck-color-list-background: var(--ck-custom-background);
            --ck-color-list-button-hover-background: var(--ck-color-base-foreground);
            --ck-color-list-button-on-background: var(--ck-custom-background);
            --ck-color-list-button-on-background-focus: var(--ck-custom-white);
            --ck-color-list-button-on-text: var(--ck-custom-background);
            --ck-color-panel-background: var(--ck-custom-background);
            --ck-color-panel-border: var(--ck-custom-border);
            --ck-color-toolbar-background: var(--ck-custom-background);
            --ck-color-toolbar-border: var(--ck-custom-border);
            --ck-color-tooltip-background: hsl(252, 7%, 14%);
            --ck-color-tooltip-text: hsl(0, 0%, 93%);
            --ck-color-image-caption-background: hsl(0, 0%, 97%);
            --ck-color-image-caption-text: hsl(0, 0%, 20%);
            --ck-color-widget-blurred-border: hsl(0, 0%, 87%);
            --ck-color-widget-hover-border: hsl(43, 100%, 68%);
            --ck-color-widget-editable-focus-background: var(--ck-custom-white);
            --ck-color-link-default: hsl(190, 100%, 75%);
        }
        
        .ck-content .todo-list {
            list-style: none;
        }
        
        .ck-content .todo-list li {
            margin-bottom: 5px;
        }
        
        .ck-content .todo-list li .todo-list {
            margin-top: 5px;
        }
        
        .ck-content .todo-list .todo-list__label > input {
            -webkit-appearance: none;
            display: inline-block;
            position: relative;
            width: var(--ck-todo-list-checkmark-size);
            height: var(--ck-todo-list-checkmark-size);
            vertical-align: middle;
            border: 0;
            left: -25px;
            margin-right: -15px;
            right: 0;
            margin-left: 0;
        }
        
        .ck-content .todo-list .todo-list__label > input::before {
            display: block;
            position: absolute;
            box-sizing: border-box;
            content: '';
            width: 100%;
            height: 100%;
            border: 1px solid hsl(0, 0%, 20%);
            border-radius: 2px;
            transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background, 250ms ease-in-out border;
        }
        
        .ck-content .todo-list .todo-list__label > input::after {
            display: block;
            position: absolute;
            box-sizing: content-box;
            pointer-events: none;
            content: '';
            left: calc( var(--ck-todo-list-checkmark-size) / 3 );
            top: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
            width: calc( var(--ck-todo-list-checkmark-size) / 5.3 );
            height: calc( var(--ck-todo-list-checkmark-size) / 2.6 );
            border-style: solid;
            border-color: transparent;
            border-width: 0 calc( var(--ck-todo-list-checkmark-size) / 8 ) calc( var(--ck-todo-list-checkmark-size) / 8 ) 0;
            transform: rotate(45deg);
        }
        
        .ck-content .todo-list .todo-list__label > input[checked]::before {
            background: hsl(126, 64%, 41%);
            border-color: hsl(126, 64%, 41%);
        }
        
        .ck-content .todo-list .todo-list__label > input[checked]::after {
            border-color: hsl(0, 0%, 100%);
        }
        
        .ck-content .todo-list .todo-list__label .todo-list__label__description {
            vertical-align: middle;
        }
        
        .ck-content .image {
            display: table;
            clear: both;
            text-align: center;
            margin: 1em auto;
        }
        
        .ck-content .image > img {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            min-width: 50px;
        }
        
        .ck-content blockquote {
            overflow: hidden;
            padding-right: 1.5em;
            padding-left: 1.5em;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            border-left: solid 5px hsl(0, 0%, 80%);
        }
        
        .ck-content[dir="rtl"] blockquote {
            border-left: 0;
            border-right: solid 5px hsl(0, 0%, 80%);
        }
        
        .ck-content .image.image_resized {
            max-width: 100%;
            display: block;
            box-sizing: border-box;
        }
        
        .ck-content .image.image_resized img {
            width: 100%;
        }
        
        
        .ck-content .image > figcaption {
            display: table-caption;
            caption-side: bottom;
            word-break: break-word;
            color: hsl(0, 0%, 20%);
            background-color: hsl(0, 0%, 97%);
            padding: .6em;
            font-size: .75em;
            outline-offset: -1px;
        }
        
        .ck-content .image.image_resized > figcaption {
            display: block;
        }
        
        .ck-content .image-style-side,
        .ck-content .image-style-align-left,
        .ck-content .image-style-align-center,
        .ck-content .image-style-align-right {
            max-width: 50%;
        }
        
        .ck-content .image-style-side {
            float: right;
            margin-left: var(--ck-image-style-spacing);
        }
        
        .ck-content .image-style-align-left {
            float: left;
            margin-right: var(--ck-image-style-spacing);
        }
        
        .ck-content .image-style-align-center {
            margin-left: auto;
            margin-right: auto;
        }
        
        .ck-content .image-style-align-right {
            float: right;
            margin-left: var(--ck-image-style-spacing);
        }
        
        .ck-content .media {
            clear: both;
            margin: 1em 0;
            display: block;
            min-width: 15em;
        }
        
        .ck-content .table {
            margin: 1em auto;
            display: table;
        }
        
        .ck-content .table table {
            border-collapse: collapse;
            border-spacing: 0;
            border: 1px double hsl(0, 0%, 70%);
        }
        
        .ck-content .table table td,
        .ck-content .table table th {
            min-width: 2em;
            padding: .4em;
            border-color: hsl(0, 0%, 85%);
        }
        
        .ck-content .table table th {
            font-weight: bold;
            background: hsl(0, 0%, 98%);
        }
        
        .ck-content .marker-yellow {
            background-color: var(--ck-highlight-marker-yellow);
        }
        
        .ck-content .marker-green {
            background-color: var(--ck-highlight-marker-green);
        }
        
        .ck-content .marker-pink {
            background-color: var(--ck-highlight-marker-pink);
        }
        
        .ck-content .marker-blue {
            background-color: var(--ck-highlight-marker-blue);
        }
        
        .ck-content .pen-red {
            color: var(--ck-highlight-pen-red);
            background-color: transparent;
        }
        
        .ck-content .pen-green {
            color: var(--ck-highlight-pen-green);
            background-color: transparent;
        }
        
        .ck-content .page-break {
            position: relative;
            clear: both;
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .ck-content .page-break::after {
            content: '';
            position: absolute;
            border-bottom: 2px dashed hsl(0, 0%, 77%);
            width: 100%;
        }
        
        .ck-content .page-break__label {
            position: relative;
            z-index: 1;
            padding: .3em .6em;
            display: block;
            text-transform: uppercase;
            border: 1px solid hsl(0, 0%, 77%);
            border-radius: 2px;
            font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
            font-size: 0.75em;
            font-weight: bold;
            color: hsl(0, 0%, 20%);
            background: #fff;
            box-shadow: 2px 2px 1px hsla(0, 0%, 0%, 0.15);
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        .ck-content code {
            background-color: hsla(0, 0%, 78%, 0.3);
            padding: .15em;
            border-radius: 2px;
        }
        
        .ck-content hr {
            border-width: 1px 0 0;
            border-style: solid;
            border-color: hsl(0, 0%, 37%);
            margin: 0;
        }
        
        .ck-content pre {
            padding: 1em;
            color: #353535;
            background: hsla(0, 0%, 78%, 0.3);
            border: 1px solid hsl(0, 0%, 77%);
            border-radius: 2px;
            text-align: left;
            direction: ltr;
            tab-size: 4;
            white-space: pre-wrap;
            font-style: normal;
            min-width: 100px;
        }
        
        .ck-content pre code {
            background: unset;
            padding: 0;
            border-radius: 0;
        }
        
        @media print {
           
            .ck-content .page-break {
                padding: 0;
            }
            
            .ck-content .page-break::after {
                display: none;
            }
        }
  `;}

    static get properties() {
        return { editorType: String,
                 editorData: String,
                 editorWidth: String,
                 editorHeight: String,
                 themeStyles: String,
                 toolBar: Array};
    }

    createRenderRoot() {
        return this;
    }

    firstUpdated(changedProperties) {
        if(this.editorType==='classic') {
            ClassicEditor.create( document.querySelector( '#classic-editor' ) , {
                    toolbar:this.toolBar
                }).then( editor => {
                    editor.setData(this.editorData);
                    this.$server.setEditorData(this.editorData);
                    editor.editing.view.change( writer => {
                        if(this.editorHeight) {
                            writer.setStyle( 'height', this.editorHeight, editor.editing.view.document.getRoot());
                        }
                        if(this.editorWidth) {
                            writer.setStyle( 'width', this.editorWidth, editor.editing.view.document.getRoot());
                        }
                    } );
                    editor.model.document.on( 'change:data', () => {
                        this.$server.setEditorData(editor.getData());
                    } );
                    window.editor = editor;
                } ).catch( err => {
                    console.error( err.stack );
                } );
        }else if(this.editorType==='inline') {
            InlineEditor.create( document.querySelector( '#inline-editor' ) , {
                    toolbar:this.toolBar
                }).then( editor => {
                    editor.setData(this.editorData);
                    this.$server.setEditorData(this.editorData);
                    editor.editing.view.change( writer => {
                        if(this.editorHeight) {
                            writer.setStyle( 'height', this.editorHeight, editor.editing.view.document.getRoot());
                        }
                        if(this.editorWidth) {
                            writer.setStyle( 'width', this.editorWidth, editor.editing.view.document.getRoot());
                        }
                    } );
                    editor.model.document.on( 'change:data', () => {
                        this.$server.setEditorData(editor.getData());
                    } );
                    window.editor = editor;
                } ).catch( err => {
                    console.error( err.stack );
                } );
        }else if(this.editorType==='balloon') {
            BalloonEditor.create( document.querySelector( '#balloon-editor' ) , {
                    toolbar:this.toolBar
                }).then( editor => {
                    editor.setData(this.editorData);
                    this.$server.setEditorData(this.editorData);
                    editor.editing.view.change( writer => {
                        if(this.editorHeight) {
                            writer.setStyle( 'height', this.editorHeight, editor.editing.view.document.getRoot());
                        }
                        if(this.editorWidth) {
                            writer.setStyle( 'width', this.editorWidth, editor.editing.view.document.getRoot());
                        }
                    } );
                    editor.model.document.on( 'change:data', () => {
                        this.$server.setEditorData(editor.getData());
                    } );
                    window.editor = editor;
                } ).catch( err => {
                    console.error( err.stack );
                } );
        }else if(this.editorType==='decoupled') {
            DcoupledEditor.create( document.querySelector( '#decoupled-editor' ) , {
                    toolbar:this.toolBar
                }).then( editor => {
                    editor.setData(this.editorData);
                    this.$server.setEditorData(this.editorData);
                    editor.editing.view.change( writer => {
                        if(this.editorHeight) {
                            writer.setStyle( 'height', this.editorHeight, editor.editing.view.document.getRoot());
                        }
                        if(this.editorWidth) {
                            writer.setStyle( 'width', this.editorWidth, editor.editing.view.document.getRoot());
                        }
                    } );
                    editor.model.document.on( 'change:data', () => {
                        this.$server.setEditorData(editor.getData());
                    } );
                    window.editor = editor;
                    document.querySelector( '.toolbar-container' ).appendChild( editor.ui.view.toolbar.element );
                    document.querySelector( '.editable-container' ).appendChild( editor.ui.view.editable.element );
                } ).catch( err => {
                    console.error( err.stack );
                } );
        }
    }

    render() {
        if(this.editorType==='decoupled') {
            return html`
                <div class="toolbar-container"></div>
                <div class="editable-container"></div>
                <style>
                    .editable-container,
                    .toolbar-container {
                        position: relative;
                        border: 1px solid #ddd;
                        background: #eee;
                    }
            
                    .toolbar-container {
                        padding: 1em;
                    }
            
                    .editable-container {
                        padding: 3em;
                        overflow-y: scroll;
                        max-height: 500px;
                    }
            
                    .editable-container .document-editor__editable.ck-editor__editable {
                        min-height: 21cm;
                        padding: 2em;
                        border: 1px #D3D3D3 solid;
                        border-radius: var(--ck-border-radius);
                        background: white;
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                </style>
                <div id="${this.editorType}-editor" class=${classMap(this.classes)}/>
            `;
        } else {
            return html`
                <style>
                    .ckeditor {
                        --ck-color-base-foreground: var(--ck-custom-background);
                        --ck-color-button-default-background: var(--ck-custom-background);
                        --ck-color-button-default-disabled-background: var(--ck-custom-background);
                        --ck-color-button-on-background: var(--ck-custom-foreground);
                        --ck-color-button-on-disabled-background: var(--ck-custom-foreground);
                        --ck-color-button-action-text: var(--ck-custom-white);
                        --ck-color-dropdown-panel-background: var(--ck-custom-background);
                        --ck-color-dropdown-panel-border: var(--ck-custom-foreground);
                        --ck-color-split-button-hover-background: var(--ck-color-button-default-hover-background);
                        --ck-color-split-button-hover-border: var(--ck-custom-foreground);
                        --ck-color-input-background: var(--ck-custom-foreground);
                        --ck-color-list-background: var(--ck-custom-background);
                        --ck-color-list-button-hover-background: var(--ck-color-base-foreground);
                        --ck-color-list-button-on-background: var(--ck-color-base-active);
                        --ck-color-list-button-on-background-focus: var(--ck-color-base-active-focus);
                        --ck-color-list-button-on-text: var(--ck-color-base-background);
                        --ck-color-panel-b  ckground: var(--ck-custom-background);
                        --ck-color-panel-border: var(--ck-custom-border);
                        --ck-color-toolbar-background: var(--ck-custom-background);
                        --ck-color-toolbar-border: var(--ck-custom-border);
                        --ck-color-widget-editable-focus-background: var(--ck-custom-white);
                    }
                </style>
                <div id="${this.editorType}-editor" class="ckeditor"/>
            `;
        }

    }

}

customElements.get('vaadin-ckeditor') || customElements.define('vaadin-ckeditor', VaadinCKEditor);
