import SidebarLayout from "@/components/layout/SidebarLayout";
import { Plus, Minus } from "lucide-react";

interface OrgNode {
  name: string;
  role: string;
  team: string;
  initials: string;
  children?: OrgNode[];
}

const orgData: OrgNode = {
  name: "Unpixel Office",
  role: "",
  team: "",
  initials: "",
  children: [
    { name: "Angeline Beier", role: "CEO", team: "Pixel Office", initials: "AB", children: [] },
    { name: "Alfredo George", role: "CTO", team: "Pixel Office", initials: "AG", children: [] },
    { name: "Davis Levin", role: "CFO", team: "Pixel Office", initials: "DL", children: [] },
    {
      name: "Carla Workman",
      role: "CPO",
      team: "Pixel Office",
      initials: "CW",
      children: [
        { name: "Corey Lipshutz", role: "Project Manager", team: "Team Project", initials: "CL" },
      ],
    },
  ],
};

const OrgCard = ({ node, hasChildren }: { node: OrgNode; hasChildren?: boolean }) => (
  <div className="flex flex-col items-center">
    <div className="bg-card border border-border rounded-xl p-4 text-center min-w-[160px] relative">
      <div className="w-14 h-14 rounded-full bg-hr-teal/20 mx-auto mb-2 flex items-center justify-center text-sm font-bold text-hr-teal">
        {node.initials}
      </div>
      <p className="font-semibold text-foreground text-sm">{node.name}</p>
      <p className="text-xs text-hr-teal font-medium">{node.role}</p>
      {node.team && <p className="text-xs text-hr-text-light mt-1">{node.team}</p>}
    </div>
    {hasChildren !== false && (
      <div className="mt-1">
        <button className="w-6 h-6 rounded-full bg-hr-teal flex items-center justify-center text-white">
          <Plus className="w-3 h-3" />
        </button>
      </div>
    )}
  </div>
);

const OrgChart = () => (
  <SidebarLayout>
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">ORG Chart</h1>
      <div className="border-t border-border pt-8">
        {/* Root node */}
        <div className="flex flex-col items-center">
          <div className="bg-card border border-border rounded-full px-6 py-3">
            <span className="font-medium text-foreground">{orgData.name}</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="w-6 h-6 rounded-full bg-destructive flex items-center justify-center text-white mb-2">
            <Minus className="w-3 h-3" />
          </div>

          {/* Connecting lines */}
          <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] h-px bg-border" />
            <div className="flex justify-center gap-8 pt-6">
              {orgData.children?.map((child) => (
                <div key={child.name} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-border -mt-6" />
                  <OrgCard node={child} hasChildren={child.children && child.children.length > 0} />
                  {child.children && child.children.length > 0 && (
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-px h-6 bg-border" />
                      {child.children.map((grandchild) => (
                        <OrgCard key={grandchild.name} node={grandchild} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </SidebarLayout>
);

export default OrgChart;
