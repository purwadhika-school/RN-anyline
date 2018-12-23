export default {
  license:
    "eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiXSwidmFsaWQiOiIyMDE5LTAxLTIyIiwibWFqb3JWZXJzaW9uIjoiMyIsImlzQ29tbWVyY2lhbCI6ZmFsc2UsInRvbGVyYW5jZURheXMiOjMwLCJzaG93UG9wVXBBZnRlckV4cGlyeSI6dHJ1ZSwiaW9zSWRlbnRpZmllciI6WyJjb20uYW55bGluZWFwcHMiXSwiYW5kcm9pZElkZW50aWZpZXIiOlsiY29tLmFueWxpbmVhcHBzIl0sIndpbmRvd3NJZGVudGlmaWVyIjpbImNvbS5hbnlsaW5lYXBwcyJdfQpkTGIwR0dJT2tQRTN0YktpQTBkNVJPS0FxdEpiVzZzUTE3L3d3c2NIa3ByQVBBR2dicXFzbitNb1ZWbGluVjBNK1c4eFA1NHpSd3Z2MWhoUnR1ZThuVkxMckIxeE50T005V0tRRDhmT0lIUFRwUngvNFRKNzdISjhZbXlRbjdjeTdtbC9vQ0Y2R1VQN1FZeHdaUDV2K2ZxYWNVdzlDWVRhWWpLWXRHVXJabE5TR2doQUdDdUt2NmNQeEtpSkJYS0xHSEt0TWozM2hMek9aNGEyak9VTndLNktXWVMzdWl6aDVwaG13SkxtOEh2N29ncDlObjRUTWpqN2k2UzAxTWNBRHBjbzFhUm9iMjRGaUhSRm9vZWUvVjZaMnBlYnNYckszSEZURW5pSFhkY3d1cUE1cjF6UlVzeW9tTlJneUh6bllob2R0akZKeXV5ODBQSllvak1idkE9PQ==",
  options: {
    camera: {
      captureResolution: "1080p"
    },
    flash: {
      mode: "auto",
      alignment: "bottom_right"
    },
    viewPlugin: {
      plugin: {
        id: "Barcode_ID",
        barcodePlugin: {
          barcodeFormatOptions: ["CODABAR", "EAN_13", "UPC_A"]
        }
      },
      cutoutConfig: {
        style: "rect",
        maxWidthPercent: "80%",
        maxHeightPercent: "80%",
        alignment: "center",
        ratioFromSize: {
          width: 100,
          height: 80
        },
        strokeWidth: 1,
        cornerRadius: 3,
        strokeColor: "FFFFFF",
        outerColor: "000000",
        outerAlpha: 0.3,
        feedbackStrokeColor: "0099FF"
      },
      scanFeedback: {
        style: "rect",
        strokeColor: "0099FF",
        fillColor: "220099FF",
        animationDuration: 150,
        blinkOnResult: true,
        beepOnResult: true,
        vibrateOnResult: true
      },
      cancelOnResult: true
    },
    doneButton: {
      // iOS only. Android uses hardware back button.
      title: "OK",
      type: "rect", // fullwidth, rect
      cornerRadius: 0,
      //"backgroundColor":"#EEEEEE", // default clearcolor
      textColor: "FFFFFF",
      textColorHighlighted: "CCCCCC",
      fontSize: 33,
      fontName: "HelveticaNeue",
      positionXAlignment: "center", // left,right,center - no affect on fullwidth
      positionYAlignment: "bottom", // top, center, bottom
      offset: {
        x: 0, // postive -> right
        y: -88 // postive -> down
      }
    }
  }
};
