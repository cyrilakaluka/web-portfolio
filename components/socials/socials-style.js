const css = ({ size, expanded, expandOnHover }) => /*css*/`
  @import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css);
  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border: 2px solid #3f4551;
    border-radius: 50px;
    padding: 10px;
    padding-right: ${expanded ? '20px' : '10px'};
    transition: all 400ms ease;
    color: var(--font-color);
    overflow: hidden;
  }

  .link:hover,
  :host(.automated-hover) .link {
    padding-right: 20px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${size || 32}px;
    width: ${size || 32}px;
    aspect-ratio: 1 / 1;
    color: var(--icon-color);
    display: flex;
    align-items: center;
  }

  .display-name {
    position: relative;
    left: 10px;
    font-weight: bold;
    max-width: ${expanded ? 'none' : 0};
    transition: all 500ms ease;
  }

  .link:hover .display-name,
  :host(.automated-hover) .display-name {
    max-width: ${expanded ? 'none' : expandOnHover ? '128px' : 0};
  }
`;

export default (context) => `<style>${css(context)}</style>`;