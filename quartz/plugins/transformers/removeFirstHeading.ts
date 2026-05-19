import { QuartzTransformerPlugin } from "../types"
import { visit, SKIP } from "unist-util-visit"

export const RemoveFirstHeading: QuartzTransformerPlugin = () => ({
  name: "RemoveFirstHeading",
  markdownPlugins() {
    return [
      () => (tree, file) => {
        const title = file.data.frontmatter?.title
        if (!title) return

        let removed = false
        visit(tree, "heading", (node, index, parent) => {
          if (!removed && node.depth === 1 && parent && index !== undefined) {
            parent.children.splice(index, 1)
            removed = true
            return [SKIP, index]
          }
        })
      },
    ]
  },
})
